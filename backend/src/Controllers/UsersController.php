<?php

require_once __DIR__ . '/../Services/Response.php';
require_once __DIR__ . '/../Services/Cors.php';

class UsersController
{
    use Response;
    use Cors;

    public function getAllUsers()
    {
        $usersRepository = new UsersRepository();
        $users = $usersRepository->getAll();

        $jsonReponse = json_encode($users);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }

    public function getDeleteUsers($id_users)
    {
        $usersRepository = new UsersRepository();
        $usersDelete = $usersRepository->getDelete($id_users);

        $jsonReponse = json_encode($usersDelete);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }

    public function getCreateUsers($nom, $prénom, $activité, $mot_de_passe, $mail)
    {
        $usersRepository = new UsersRepository();

        $usersCreate = $usersRepository->getCreate($nom, $prénom, $activité, $mot_de_passe, $mail);

        $jsonReponse = json_encode($usersCreate);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }

    public function getUpdateUsers($nom, $prénom, $activité, $mot_de_passe, $mail)
    {
        $usersRepository = new UsersRepository();
        $usersUpdate = $usersRepository->getUpdate($nom, $prénom, $activité, $mot_de_passe, $mail);


        $jsonReponse = json_encode($usersUpdate);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }

    public function getverifMail($mail)
    {
        $usersRepository = new UsersRepository();
        $usersVerfiMail = $usersRepository->verifMail($mail);

        $jsonReponse = json_encode($usersVerfiMail);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }

    public function getLogIn($mail, $password)
    {

        $usersRepository = new UsersRepository();
        $usersLogIn = $usersRepository->login($mail, $password);

        $jsonReponse = json_encode($usersLogIn);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }



    public function postVerifMail()
    {
        $usersRepository = new UsersRepository();
        $usersVerfiMail = $usersRepository->verifMail($_POST['mail']);

        echo json_encode(["user" => $usersVerfiMail]);
    }
}
