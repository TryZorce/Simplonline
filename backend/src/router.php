é<?php

$userController = new UsersController();
$coursController = new CoursController();
$promoController = new PromoController();
$errorController = new ErrorController();

$route = $_SERVER['REQUEST_URI'];
$methode = $_SERVER['REQUEST_METHOD'];

switch ($route) {
    case API_USERS:
        switch ($methode) {
            case 'GET':
                $userController->getAllUsers();
                break;
            case 'POST':
                $usersVerfiMail = $usersRepository->verifMail($mail);
                break;
        }

        break;

    case API_USERS . '/update':
        switch ($methode) {
            case 'GET':
                $userController->getUpdateUsers($nom, $prénom, $activité, $mot_de_passe, $mail);
                break;
            case 'POST':
                $userController->getUpdateUsers($nom, $prénom, $activité, $mot_de_passe, $mail);
                break;
        }
        
        

        break;

    case API_USERS . '/create':
        switch ($methode) {
            case 'POST':
                $userController->getCreateUsers($nom, $prénom, $activité, $mot_de_passe, $mail);
                break;
        }

        break;

    case API_COURS:
        switch ($methode) {
            case 'GET':
                $coursController->getAllCours();
                break;
        }

        break;

    case API_COURS . '/coursandpromo':
        switch ($methode) {
            case 'GET':
                $coursController->getCoursAndPromo();
                break;
        }

        break;

    case API_COURS . '/coursandpromo':
        switch ($methode) {
            case 'GET':
                $coursController->getCoursAndPromo();
                break;
        }

        break;
        
    case API_COURS . '/coursjoinpromo':
        switch ($methode) {
            case 'GET':
                $coursController->getCoursJoinPromo();
                break;
        }

        break;

    case API_COURS . '/update':
        switch ($methode) {
            case 'GET':
                $coursController->updateCours($id, $jour, $periode, $idPromo);
                break;
            case 'POST':
                $coursController->updateCours($id, $jour, $periode, $idPromo);
                break;
        }

        break;

    case API_COURS . '/delete':
        switch ($methode) {
            case 'GET':
                $coursController->deleteCours($id);
                break;
        }

        break;

    case API_COURS . '/create':
        switch ($methode) {
            case 'POST':
                $coursController->createCours($jour, $periode, $idPromo);
                break;
        }

        break;

    case API_PROMO:
        switch ($methode) {
            case 'GET':
                $promoController->getAllPromo();
                break;
        }

        break;

    case API_PROMO . '/update':
        switch ($methode) {
            case 'GET':
                $promoController->updatePromo($id, $nom, $dateDebut, $dateFin, $places);
                break;
        }

        break;

    case API_PROMO . '/update':
        switch ($methode) {
            case 'GET':
                $promoController->updatePromo($id, $nom, $dateDebut, $dateFin, $places);
                break;
        }

        break;

    case API_PROMO . '/create':
        switch ($methode) {
            case 'POST':
                $promoController->createPromo($nom, $dateDebut, $dateFin, $places);
                break;
        }

        break;

    case API_PROMO . '/update':
        switch ($methode) {
            case 'GET':
                $promoController->updatePromo($id, $nom, $dateDebut, $dateFin, $places);
                break;



            case 'POST':
                $promoController->updatePromo($id, $nom, $dateDebut, $dateFin, $places);
                break;
        }

        break;

    case API_PROMO . '/delete':
        switch ($methode) {
            case 'GET':
                $promoController->deletePromoById($id);
                break;
        }

        break;


    default:
        $errorController->notFound();
}


