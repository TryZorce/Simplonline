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

    public function getDeleteUsers()
    {
        $usersRepository = new UsersRepository();
        $usersDelete = $usersRepository->getDelete($id_users);

        $jsonReponse = json_encode($usersDelete);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }

    public function getCreateUsers()
    {
        $usersRepository = new UsersRepository();
        $usersCreate = $usersRepository->getCreate($name, $first_name, $activity, $password, $mail);

        $jsonReponse = json_encode($usersCreate);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }

    public function getUpdateUsers()
    {
        $usersRepository = new UsersRepository();
        $usersUpdate = $usersRepository->getUpdate($name, $first_name, $activity, $password, $mail);

        $jsonReponse = json_encode($usersUpdate);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }

}
