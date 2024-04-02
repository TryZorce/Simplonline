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

        $jsonResponse = json_encode($promos);

        header('Content-Type: application/json');

        echo ($jsonResponse);
    }

    public function getById($id)
    {
        $promoRepository = new PromoRepository();
        $promo = $promoRepository->getById($id);

        $jsonResponse = json_encode($promo);

        header('Content-Type: application/json');

        echo ($jsonResponse);
    }

    public function create($nom, $dateDebut, $dateFin, $places)
    {
        $promoRepository = new PromoRepository();
        $id = $promoRepository->create($nom, $dateDebut, $dateFin, $places);

        $jsonResponse = json_encode(['id' => $id]);

        header('Content-Type: application/json');

        echo ($jsonResponse);
    }

    public function update($id, $nom, $dateDebut, $dateFin, $places)
    {
        $promoRepository = new PromoRepository();
        $promoRepository->update($id, $nom, $dateDebut, $dateFin, $places);

        $jsonResponse = json_encode(['status' => 'success']);

        header('Content-Type: application/json');

        echo ($jsonResponse);
    }

    public function delete($id)
    {
        $promoRepository = new PromoRepository();
        $promoRepository->delete($id);

        $jsonResponse = json_encode(['status' => 'success']);

        header('Content-Type: application/json');

        echo ($jsonResponse);
    }
}
