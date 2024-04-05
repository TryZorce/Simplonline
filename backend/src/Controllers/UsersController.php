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

    public function getCreatePasswordUsers($mot_de_passe)
    {
        $usersRepository = new UsersRepository();

        $usersCreate = $usersRepository->getCreatePassword($mot_de_passe);

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


    public function getUsersCours()
    {

        $usersRepository = new UsersRepository();
        $usersLogIn = $usersRepository->getUsersCours();

        $jsonReponse = json_encode($usersLogIn);

        header('Content-Type: application/json');

        echo ($jsonReponse);
        
    }

    public function confirmPassword() {
        // Récupérer les données envoyées par la requête AJAX
        $requestData = json_decode(file_get_contents('php://input'), true);
        $email = $requestData['mail'];
        $password = $requestData['mot_de_passe'];

        // Valider les données (vous pouvez ajouter des validations supplémentaires ici)

        // Appeler directement le UserRepository pour mettre à jour le mot de passe
        $userRepository = new UsersRepository();
        $success = $userRepository->updatePassword($email, $password);

        // Répondre à la requête AJAX
        if ($success) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false, "message" => "Erreur lors de la mise à jour du mot de passe"));
        }
    }

    
}
