<?php

namespace TidioLiveChat\Admin;

if (!defined('WPINC')) {
    die('File loaded directly. Exiting.');
}

use TidioLiveChat\Sdk\Api\Exception\TidioApiException;
use TidioLiveChat\Sdk\IntegrationFacade;
use TidioLiveChat\IntegrationState;
use TidioLiveChat\TidioLiveChat;
use TidioLiveChat\Utils\QueryParameters;

class AdminController
{
    /**
     * @var IntegrationFacade
     */
    private $integrationFacade;
    /**
     * @var IntegrationState
     */
    private $integrationState;

    /**
     * @param IntegrationFacade $integrationFacade
     * @param IntegrationState $integrationState
     */
    public function __construct($integrationFacade, $integrationState)
    {
        $this->integrationFacade = $integrationFacade;
        $this->integrationState = $integrationState;
    }

    public function handleIntegrateProjectAction()
    {
        if (!$this->isRequestNonceValid(AdminRouting::INTEGRATE_PROJECT_ACTION)) {
            wp_die('', 403);
        }

        $refreshToken = QueryParameters::get('refreshToken');
        try {
            $data = $this->integrationFacade->integrateProject($refreshToken);
        } catch (TidioApiException $exception) {
            $errorCode = $exception->getMessage();
            $this->redirectToPluginAdminDashboardWithError($errorCode);
        }

        $this->integrationState->integrate(
            $data['projectPublicKey'],
            $data['accessToken'],
            $data['refreshToken']
        );

        $this->redirectToPluginAdminDashboard();
    }

    public function handleToggleAsyncLoadingAction()
    {
        if (!$this->isRequestNonceValid(AdminRouting::TOGGLE_ASYNC_LOADING_ACTION)) {
            wp_die('', 403);
        }

        $this->integrationState->toggleAsyncLoading();

        $this->redirectToPluginsListDashboard();
    }

    public function handleClearAccountDataAction()
    {
        if (!$this->isRequestNonceValid(AdminRouting::CLEAR_ACCOUNT_DATA_ACTION)) {
            wp_die('', 403);
        }

        $this->integrationState->removeIntegration();

        $this->redirectToPluginsListDashboard();
    }

    /**
     * @param string $nonce
     * @return bool
     */
    private function isRequestNonceValid($nonce)
    {
        if (!QueryParameters::has('_wpnonce')) {
            return false;
        }

        return (bool) wp_verify_nonce(QueryParameters::get('_wpnonce'), $nonce);
    }

    private function redirectToPluginsListDashboard()
    {
        wp_redirect(admin_url('plugins.php'));
        die();
    }

    private function redirectToPluginAdminDashboard()
    {
        $url = 'admin.php?page=' . TidioLiveChat::TIDIO_PLUGIN_NAME;
        wp_redirect(admin_url($url));
        die();
    }

    /**
     * @param string $errorCode
     */
    private function redirectToPluginAdminDashboardWithError($errorCode)
    {
        $url = sprintf('admin.php?page=%s&error=%s', TidioLiveChat::TIDIO_PLUGIN_NAME, $errorCode);
        wp_redirect(admin_url($url));
        die();
    }
}
