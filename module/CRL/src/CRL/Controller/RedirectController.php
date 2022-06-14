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
     * UUID calculation constants.
     */
    const CRL_UUID_NAMESPACE = "8405ae4d-b315-42e1-918a-d1919900cf3f";
    const CRL_UUID_BASE_PATH = "https://okapi-crl.folio.ebsco.com:instances:";
  
  
    /**
     * Perform a dynamic redirect.
     *
     * @return mixed
     */
    public function redirectAction()
    {
      // Type could be used in the future to differentiate on various redirect
      // cases within this single controller.
      $type = $this->params('type');
      // Id to resolve and base a redirect around.
      $id = $this->params('id');
      
      // Resolve FOLIO ID from legacy bib ID
      $uuid = Uuid::uuid5(self::CRL_UUID_NAMESPACE, self::CRL_UUID_BASE_PATH . $id)->toString();
      
      // Perform redirect
      try {
        // getRecordLoader() will throw an exception if the record does not
        // exist, but also address any cases where the result is empty.
        if (!$this->getRecordLoader()->load($uuid)) {
          throw new \Exception("No record found to redirect");
        }
        $details = $this->getRecordRouter()->getRouteDetails($uuid);
        $target = $this->url()->fromRoute($details['route'], $details['params']);
        return $this->redirect()->toUrl($target);
      }
      catch (\Exception $e) {
        // Fallback for all exceptions is 404
        $this->getResponse()->setStatusCode(404);
      }


    }
}
