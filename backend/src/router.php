<?php

$studentController = new UsersController();

$route = $_SERVER['REQUEST_URI'];
$methode = $_SERVER['REQUEST_METHOD'];

switch ($route) {
    case API_STUDENT:
        switch ($methode) {
            case 'GET':
                $studentController->getAllUsers();
                break;
        }
        break;
}
