
class Material {
    specs = {
        'ABS':{'UnitPrice':20.99,'Difficulty':1.0,'Efficency':1.0,'Recycle':0.0},
        'PC':{'UnitPrice':28.06,'Difficulty':1.2,'Efficency':0.667,'Recycle':0.0},
        'PMMA':{'UnitPrice':6.00,'Difficulty':1.2,'Efficency':0.667,'Recycle':0.0},
        'Aluminum-5052':{'UnitPrice':71.25,'Difficulty':1.5,'Efficency':0.556,'Recycle':0.0},
        'Aluminum-6061':{'UnitPrice':74.10,'Difficulty':1.8,'Efficency':0.556,'Recycle':0.0},
    };

    constructor(name) {
        this.name = name;

        var spec = this.specs[name];
        if (spec == null) {
            this.difficulty_ratio = 0;
            this.unit_price = 0;
            this.recycle_rate = 0;
        } else {
            this.difficulty_ratio = spec['Difficulty']/spec['Efficency'];
            this.unit_price = spec['UnitPrice'];
            this.recycle_rate = spec['Recycle'];
        }
    }

    sum(cube) {
        var cost = cube.v*(1.0-this.recycle_rate)*this.unit_price/1000000;
        //alert("material v " + cube.v);
        //alert("material p " + this.unit_price);
        //alert("material r " + this.recycle_rate);
        //alert("material C " + cost);
        return cost;
    }
};

class Finishing {
    specs = {
        'basic_deburred':{'Price':7.52,'Unit':10000.0,},
        'polished':{'Price':48.04 ,'Unit':10000.0,},
        'split_joint':{'Price':29.52,'Unit':10000.0,},
    };

    constructor(finish) {
        this.finish = finish;
    }

    sum(s) {
        var result = 0.0;
        for (let k in this.specs) {
            let v = this.specs[k];
            for (let f in this.finish) {
                if (this.finish[f] == k) {
                    result += s * v["Price"]/v["Unit"];
                }
            }
        }
        return result;
    }
};

class Cube {
    constructor(l,w,h) {
        this.l = l;
        this.w = w;
        this.h = h;
        this.v = l*w*h;
        this.s = l*w*2 + w*h*2 + h*l*2;
    }
}

class Part {
    s_yield_ratio = 5;
    
    l_rough_margin_min = 15;
    l_rough_margin_max = 20;
    l_rough_threshold = 100;
    w_rough_margin_min = 15;
    w_rough_margin_max = 20;
    w_rough_threshold = 100;
    h_rough_margin = 1;

    constructor(l,w,h,v,s,c,u,t) {
    
        this.l = l;
        this.w = w;
        this.h = h;
        this.v = v;
        this.s = s;
        this.s_yield = s + (this.s_yield_ratio-1)*c;
        this.c = c;
        this.u = u;
        this.t = t;
        this.bound = new Cube(l,w,h);
        this.rough = this.rough_cube();
    }

    rough_cube() {
        var l_margin = (this.l<this.l_rough_threshold)?this.l_rough_margin_min:this.l_rough_margin_max;
        var w_margin = (this.w<this.w_rough_threshold)?this.w_rough_margin_min:this.w_rough_margin_max;
        var h_margin = (this.h_rough_margin);

        var l = Math.ceil(this.l + l_margin*2);
        var w = Math.ceil(this.w + w_margin*2);
        var h = Math.ceil(this.h + h_margin*2);
        return new Cube(l,w,h);
    }
}

class Algo_CNC_Shape {
    fee_v = 0.00005;
    fee_s = 0.00025;

    constructor(part,material) {
        this.part = part;
        this.material = material;
    }

    formula_outline_sv_ratio() {
        return Math.pow(this.part.s/this.part.bound.s,1/2)/Math.pow(this.part.v/this.part.bound.v,1/3);
    }

    formula_outline_sv_ratio_weighted_10sv_1_3() {
        return this.formula_outline_sv_ratio()*Math.pow(10*this.part.s/this.part.v, 1/3);
    }

    sum() {
        var cost = 0;
        var complexity_v = 1;
        var complexity_s = 1;
    
        var complexity = this.formula_outline_sv_ratio_weighted_10sv_1_3();
        var complexity_v = complexity;

        cost += this.part.s_yield*this.fee_s*this.material.difficulty_ratio;
        cost += (this.part.rough.v-this.part.v)*this.fee_v*complexity_v*(this.part.v/this.part.rough.v)*this.material.difficulty_ratio;
        
        return cost;
    }
}

class PriceLeveler_Curve {
    k0 = 190.0;
    k1 = 0.0333;
    k2 = 0.0013;
    low_limit = 250.0;

    adjust(price) {
        if (price < this.low_limit) {
            return this.k2*price*price + this.k1*price + this.k0;
        }
        return price;
    }
}

class PriceLeveler_K {
    lower_k0 = 150.0;
    lower_k1 = 800.0;

    upper_k0 = 300
    upper_k1 = 2500
    upper_v0 = 4.0
    upper_v1 = 2.5

    adjust_lower(price) {
        if (price < this.lower_k1) {
            return price*(this.lower_k1-this.lower_k0)/this.lower_k1 + this.lower_k0;
        }
        return price;
    }

    adjust_upper(price) {
        var v = this.upper_v1;
        var k = (this.upper_v0-this.upper_v1)/(this.upper_k1-this.upper_k0);
        if (price < this.upper_k1) {
            v = this.upper_v0 - (price-this.upper_k0)*k;
        }
        return price*v;
    }
}

class Quote {
    // 零件体积、面积，零件包容盒长宽高尺寸和材料
    constructor(v,s,c,l,w,h,m,p,u,t) {
        this.part = new Part(l,w,h,v,s,c,u,t);
        this.material = new Material(m);
        this.finishing = new Finishing(p);
        this.priceleveler = new PriceLeveler_K();
    }

    cnc() {
        var cost = 0;
        var algo_shape = new Algo_CNC_Shape(this.part,this.material);

        cost += algo_shape.sum();
        //alert("0 " + cost);
        cost += this.material.sum(this.part.rough);
        cost += this.finishing.sum(this.part.s);
        //alert("1 " + cost);

        cost = this.priceleveler.adjust_lower(cost);
        //alert("2 " + cost);
        cost = this.priceleveler.adjust_upper(cost);
        //alert("3 " + cost);

        // 除以汇率，转成美金
        var rate = 6.3;
        cost = cost/rate;
        return cost;
    }
}