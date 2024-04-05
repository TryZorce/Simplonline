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

        header('Content-Type: application/json');
        $jsonResponse = json_encode($cours);


        echo ($jsonResponse);
    }

    public function getCoursById($id)
    {
        $coursRepository = new CoursRepository();
        $cours = $coursRepository->getById($id);

        if ($cours) {
            $jsonResponse = json_encode($cours);
            header('Content-Type: application/json');
            echo ($jsonResponse);
        } else {
            http_response_code(404);
            echo "Cours not found";
        }
    }

    public function createCours($jour, $periode, $idPromo)
    {
        $coursRepository = new CoursRepository();
        $id = $coursRepository->create($jour, $periode, $idPromo);

        if ($id) {
            http_response_code(201);
            echo "Cours created with ID: $id";
        } else {
            http_response_code(500);
            echo "Failed to create cours";
        }
    }

    public function updateCours($id, $jour, $periode, $idPromo)
    {
        $coursRepository = new CoursRepository();
        $coursRepository->update($id, $jour, $periode, $idPromo);

        echo "Cours updated successfully";
    }

    public function deleteCours($id)
    {
        $coursRepository = new CoursRepository();
        $coursRepository->delete($id);

        echo "Cours deleted successfully";
    }

    public function getCoursAndPromo($id)
    {
        $coursRepository = new CoursRepository();
        $coursRepository->getCoursAndPromo($id);

        header('Content-Type: application/json');
        $jsonResponse = json_encode($coursRepository);


        echo ($jsonResponse);
    }
}
