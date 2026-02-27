STLView = function(containerId, url) {
	var scope = this;

	
	this.containerId  = containerId;
	var container     = document.getElementById(containerId);

	// var stats    = null;
	var camera   = null;
	var scene    = null;
	var renderer = null;

	var box_volume = 0;
	var surface_area = 0;
	var model_volume = 0;

	var ambientLight     = null;
	var directionalLight = null;
	var pointLight       = null;
	var pointLight2       = null;

	var width  = parseFloat(container.parentNode.clientWidth);
	var height = parseFloat(container.parentNode.clientHeight) - 40;

	var geometry;

	this.initScene = function() {		
		container.innerHTML      = '';

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 45, width/height, 1, 1000 );
		camera.position.set(200, 300, 200); //设置相机位置
		camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

		var ambientLight = new THREE.AmbientLight(0x444444);
		scene.add(ambientLight);

		var pointLight = new THREE.PointLight(0xffffff);
		pointLight.position.set(400, 200, 300); 
		scene.add(pointLight); 
		var pointLight2 = new THREE.PointLight(0xffffff);
		pointLight2.position.set(-400, -200, -300);
		scene.add(pointLight2);

		var loader = new THREE.STLLoader();

		var urlarr = url.split('/');
		var filename = urlarr[urlarr.length-1];
		var loadurl = '/wp-content/uploads/stl_files_uploads/' + filename;

		loader.load( loadurl, function ( geometry ) {
			//console.log('geometry',geometry);
			geometry.center();
			if (geometry.hasColors) {
				var material = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
				var mesh = new THREE.Mesh( geometry, material );
			}else if(geometry.groups.length){
				var materials = [];
				var nGeometryGroups = geometry.groups.length;

				for (var i = 0; i < nGeometryGroups; i++) {

					var material = new THREE.MeshPhongMaterial({
						color: 0xdddddd,
						wireframe: false
					});

				}

				materials.push(material);
				var mesh = new THREE.Mesh(geometry, materials);
			}else{
				var material = new THREE.MeshPhongMaterial({ opacity: 1, color: 0xdddddd });
				var mesh = new THREE.Mesh( geometry, material );
			}

			mesh.geometry.computeBoundingBox();
			var box = mesh.geometry.boundingBox.max.clone().sub(mesh.geometry.boundingBox.min);
			console.log('box',box);
			var box_x = Math.round(box.x * 100) / 100;
			var box_y = Math.round(box.y * 100) / 100;
			var box_z = Math.round(box.z * 100) / 100;
			var minxy = (100/box_x)>(100/box_y)?(100/box_y):(100/box_x);
			var minxyz = minxy>(100/box_z)?(100/box_z):minxy;
		
			mesh.rotation.x = -0.5 * Math.PI; //将模型摆正
			mesh.scale.set(minxyz, minxyz, minxyz); //缩放
			scene.add(mesh);
			//mesh.geometry.computeBoundingBox();
			// var boundingBox = mesh.geometry.boundingBox;
			// console.log('boundingBox',boundingBox);
			// var helper = new THREE.Box3Helper( boundingBox, 0xffff00 );
			// console.log('helper',helper);
			//scene.add( helper );
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(width, height);
			renderer.setClearColor(0xffffff, 1);
			container.innerHTML=""
			container.appendChild(renderer.domElement);
			var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
			controls.enablePan = false;
			controls.autoRotate = true;
			function render() {
				renderer.render(scene,camera);//执行渲染操作
				controls.update();
				requestAnimationFrame(render);//请求再次执行渲染函数render
			}
			render();
		},function ( progress ) {
			//console.log( 'progress',progress );
			//console.log( 'progress.loaded',progress.loaded );
			var percentVal = Math.round(progress.loaded/progress.total*100) + '%';
			console.log( 'percentVal',percentVal);
			jQuery('.preview-info').show();
			jQuery('#progress').show();
			jQuery('#bar').width(percentVal);
			jQuery('#bar').css("background-color","#0383fe");
			var percenthtml = 'Rendering: ' + percentVal;
			jQuery('#percent').html(percenthtml);
			if(percentVal=='100%'){
				jQuery('.preview-info').hide();
			}
		}, function ( error ) {
			jQuery('.preview-info').show();
			jQuery('#progress').hide();
		} );
	}	
}


var calculateModel = function ( geometry ) {
	function SignedTriangleVolume( v1, v2, v3 ) {
		var v321 = v3.x * v2.y * v1.z;
		var v231 = v2.x * v3.y * v1.z;
		var v312 = v3.x * v1.y * v2.z;
		var v132 = v1.x * v3.y * v2.z;
		var v213 = v2.x * v1.y * v3.z;
		var v123 = v1.x * v2.y * v3.z;
		return ( -v321 + v231 + v312 - v132 - v213 + v123 ) / 6.0;
	}

    function TriangleArea ( v1, v2, v3 ) {
        var v12 = v2.clone().sub(v1);
        var v13 = v3.clone().sub(v1);

        var cross = new THREE.Vector3();
        cross.crossVectors( v12, v13 );
  
        return (cross.length() / 2.0);;
    }

	var volume = 0;
	var area   = 0;

	switch(geometry.type) {

	    case 'Geometry':
	    	//case 'Object3D':
			var vertices = geometry.vertices;
			var triangles_count = 0;
			geometry.faces.forEach( function( triangle ) {
				var currentVol = SignedTriangleVolume(vertices[triangle.a], vertices[triangle.b], vertices[triangle.c]);

				var currentArea = TriangleArea(vertices[triangle.a], vertices[triangle.b], vertices[triangle.c]);

				volume += currentVol;
				area   += currentArea;
				triangles_count++;
			}); 
			var model_triangles = triangles_count;
			break;
	    case 'BufferGeometry':
			var vertices = geometry.attributes.position;
			var model_triangles = geometry.attributes.position.count / 3;

			for (var i = 0; i < model_triangles; i++) {
				var a = new THREE.Vector3(vertices.array[ (i * 9)     ], vertices.array[ (i * 9) + 1 ], vertices.array[ (i * 9) + 2 ]);
				var b = new THREE.Vector3(vertices.array[ (i * 9) + 3 ], vertices.array[ (i * 9) + 4 ], vertices.array[ (i * 9) + 5 ]);
				var c = new THREE.Vector3(vertices.array[ (i * 9) + 6 ], vertices.array[ (i * 9) + 7 ], vertices.array[ (i * 9) + 8 ]);

				var currentVol  = SignedTriangleVolume(a, b, c);
				var currentArea = TriangleArea(a, b, c);
				 
				volume += currentVol;
				area   += currentArea;
			}
			break;
    }
    
    var model_arr = [];
	// VOLUME IN mm3
	var model_volume = Math.abs(volume);
	model_arr.push(model_volume);
	//console.log('model_volume',model_volume);

	// AREA IN mm2
	var surface_area = Math.abs(area);
	model_arr.push(surface_area);
	//console.log('model_area',surface_area);

	geometry.computeBoundingBox();
	var box = geometry.boundingBox.max.clone().sub(geometry.boundingBox.min);
	console.log('cacubox',box);
	var box_x = Math.round(box.x * 100) / 100;
	var box_y = Math.round(box.y * 100) / 100;
	var box_z = Math.round(box.z * 100) / 100;
	var box_volume = box_x * box_y * box_z;
	model_arr.push(box_volume);
	model_arr.push(box);
	//console.log('box_volume', box_volume);
	console.log('model_arr', model_arr);

	return model_arr;
}