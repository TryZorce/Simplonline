<?php

$userController = new UsersController();
$coursController = new CoursController();
$promoController = new PromoController();

$route = $_SERVER['REQUEST_URI'];
$methode = $_SERVER['REQUEST_METHOD'];

switch ($route) {
    case API_USERS:
        switch ($methode) {
            case 'GET':
                $userController->getAllUsers();
               // $userController->getUpdateUsers($id_users, $nom, $prénom, $activité, $mot_de_passe, $mail);
               // $userController->getDeleteUsers($id_users);
                break;
            case 'POST':
                //$userController->getCreateUsers($nom, $prénom, $activité, $mot_de_passe, $mail);
                break;
        }
    case API_COURS:
        switch ($methode) {
            case 'GET':
                $coursController->getAllCours();
               // $coursController->updateCours($id, $jour, $periode, $idPromo);
                //$coursController->deleteCours($id);
                break;
            case 'POST':
               // $coursController->createCours($jour, $periode, $idPromo);
                break;
        }
    case API_PROMO:
        switch ($methode) {
            case 'GET':
                $promoController->getAllPromo();
               // $promoController->updateCours($id, $nom, $dateDebut, $dateFin, $places);
                //$promoController->deleteCoursById($id);
                break;
            case 'POST':
               // $promoController->createCours($nom, $dateDebut, $dateFin, $places);
                break;
        }
        break;
}
