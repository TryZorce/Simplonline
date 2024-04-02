<?php

$userController = new UsersController();

$route = $_SERVER['REQUEST_URI'];
$methode = $_SERVER['REQUEST_METHOD'];

switch ($route) {
    case API_USERS:
        switch ($methode) {
            case 'GET':
                $userController->getAllUsers($id_users);
                $userController->getUpdateUsers($name, $first_name, $activity, $password, $mail);
                $userController->getDeleteUsers($id_users);
                break;
            case 'POST':
                $userController->getCreateUsers($name, $first_name, $activity, $password, $mail);
                break;

        }
        break;
}
