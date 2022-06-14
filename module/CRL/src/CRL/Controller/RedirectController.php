<?php
/**
 * Legacy redirect controller
 */
namespace CRL\Controller;

use Laminas\Config\Config;
use Laminas\ServiceManager\ServiceLocatorInterface;
use VuFind\UrlShortener\UrlShortenerInterface;
use Ramsey\Uuid\Uuid;

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
      
      $uuid = Uuid::uuid5("8405ae4d-b315-42e1-918a-d1919900cf3f", 'https://okapi-crl.folio.ebsco.com:instances:' . $id)->toString();
      
      // Test redirect
      // @todo: Resolve URL dynamically in a way that works across instances
      $url = '/vufind/Record/' . $uuid;
      return $this->redirect()->toUrl($url);

      // Fallback
      $this->getResponse()->setStatusCode(404);
    }
}
