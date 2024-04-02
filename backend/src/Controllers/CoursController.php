<?php

require_once __DIR__ . '/../Services/Response.php';
require_once __DIR__ . '/../Services/Cors.php';

class CoursController
{
    use Response;
    use Cors;

    public function getAllCours()
    {
        $coursRepository = new CoursRepository();
        $cours = $coursRepository->getAll();

        $jsonReponse = json_encode($cours);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }
}
