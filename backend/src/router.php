<?php

$userController = new UsersController();

$route = $_SERVER['REQUEST_URI'];
$methode = $_SERVER['REQUEST_METHOD'];

switch ($route) {
    case API_USERS:
        switch ($methode) {
            case 'GET':
                $userController->getAllUsers();
                $userController->getUpdateUsers();
                $userController->getDeleteUsers();
                break;
            case 'POST':
                $userController->getCreateUsers();
                break;

        }
        break;
}
