<?php

require_once __DIR__ . '/../Services/Response.php';
require_once __DIR__ . '/../Services/Cors.php';

class PromoController
{
    use Response;
    use Cors;

    public function getAllPromo()
    {
        $promoRepository = new PromoRepository();
        $promos = $promoRepository->getAll();

        $jsonReponse = json_encode($promos);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }
}
