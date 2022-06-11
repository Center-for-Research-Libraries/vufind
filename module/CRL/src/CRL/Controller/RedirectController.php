<?php
/**
 * Legacy redirect controller
 */
namespace CRL\Controller;

use Laminas\Config\Config;
use Laminas\ServiceManager\ServiceLocatorInterface;
use VuFind\UrlShortener\UrlShortenerInterface;

/**
 * Legacy redirect controller
 */
class RedirectController extends \VuFind\Controller\AbstractBase
{

    /**
     * Perform a dynamic redirect.
     *
     * @return mixed
     */
    public function redirectAction()
    {
      $type = $this->params('type');
      $id = $this->params('id');
      
      // Test redirect
      $url = 'Record/4cb6ef6a-7f87-5bbc-bc54-f59732536e5c';
      return $this->redirect()->toUrl($url);

      // Fallback
      $this->getResponse()->setStatusCode(404);
    }
}
