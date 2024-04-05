<?php

class UsersRepository extends Database
{
    public function getAll()
    {
        $req = $this->getDb()->query('SELECT * FROM users');

        $data = $req->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    public function getCreate($nom, $prénom, $activité, $mot_de_passe, $mail)
    {

        $nom = $_POST['nom'];
        $prénom = $_POST['prénom'];
        $activité = $_POST['activité'];
        $mot_de_passe = password_hash($_POST['mot_de_passe'], PASSWORD_DEFAULT);
        $mail = $_POST['mail'];


        $query = 'INSERT INTO users (nom, prénom, activité, mot_de_passe, mail) 
        VALUES (:nom, :prénom, :activité, :mot_de_passe, :mail)';

        $req = $this->getDb()->prepare($query);

        $req->execute([
            'name' => $nom,
            'prénom' => $prénom,
            'activité' => $activité,
            'mot_de_passe' => $mot_de_passe,
            'mail' => $mail,
        ]);

        return $req->fetchAll(PDO::FETCH_CLASS, Users::class);

        if ($req->rowCount() > 0) {
            echo json_encode(["message" => "Utilisateur créé avec succès"]);
        } else {
            echo json_encode(["error" => "Erreur lors de la création de l'utilisateur"]);
        }
    }

    public function getDelete($id_users)
    {
        $query = 'DELETE FROM users WHERE id_users = :id_users';

        $req = $this->getDb()->prepare($query);

        $req->execute([
            'id_users' => $id_users,
        ]);

        return $req->fetchAll(PDO::FETCH_CLASS, Users::class);
    }

    public function getUsersId($id_users)
    {
        $query = 'SELECT * FROM users WHERE id_users = :id_users';
        $req = $this->getDb()->prepare($query);

        $req->execute([
            'id_users' => $id_users,
        ]);

        return $req->fetchAll(PDO::FETCH_CLASS, Users::class);
    }

    public function getUpdate($nom, $prénom, $activité, $mot_de_passe, $mail)
    {
        $query = 'UPDATE users SET nom = :nom, prénom = :prénom, activité= :activité, mot_de_passe= :mot_de_passe, mail= :mail
        WHERE id_users = :id_users';

        $req = $this->getDb()->prepare($query);

        $req->execute([
            'nom' => $nom,
            'prénom' => $prénom,
            'activité' => $activité,
            'mot_de_passe' => $mot_de_passe,
            'mail' => $mail,
        ]);

        return $req->fetchAll(PDO::FETCH_CLASS, Users::class);
    }

    public function verifMail($mail)
    {
        $sql = "SELECT * FROM users WHERE mail = :mail";
        $stmt = $this->getDb()->prepare($sql);
        $stmt->bindParam(':mail', $mail);
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'users');
        $stmt->execute();
        return $stmt->fetch();
    }


    public function login($mail, $password)
    {
        $sql = "SELECT * FROM users WHERE mail = :mail";
        $stmt = $this->getDb()->prepare($sql);
        $stmt->bindParam(':mail', $mail);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);


        if ($user && password_verify($password, $user['password'])) {

            $email = $_POST['email'];
            $password = $_POST['password'];

            $result = $this->login($email, $password);

            return $result;
        } else {
            return false;
        }
    }

    public function getUsersCours()
    {
        $query = "
            SELECT 
                Users.nom AS nom_utilisateur, 
                Users.prénom AS prénom_utilisateur, 
                Cours.periode AS période_cours, 
                Cours.jour AS jour_cours,
                Promo.nom AS nom_promo,
                Rôles.nom AS nom_classe
            FROM 
                user_cours
            INNER JOIN 
                Users ON user_cours.id_users = Users.id_users
            INNER JOIN 
                Cours ON user_cours.id = Cours.id
            INNER JOIN
                Promo ON Cours.id_promo = Promo.id_promo
            INNER JOIN
                Rôles ON Users.id_role = Rôles.id_role;
        ";

        $req = $this->getDb()->prepare($query);
        $req->execute();

        return $req->fetchAll(PDO::FETCH_ASSOC);
    }
}
