<?php

class UsersRepository extends Database
{
    public function getAll()
    {
        $req = $this->getDb()->query('SELECT * FROM student');

        $data = $req->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    public function getCreate($name, $first_name, $activity, $password, $mail)
    {
        $query = 'INSERT INTO users (name, prénom, activité, mot_de_passe, mail) 
        VALUES (:nom, :prénom, :activité, :mot_de_passe, :mail)';

        $req = $this->getDb()->prepare($query);

        $req->execute([
            'name' => $name,
            'prénom' => $first_name,
            'activité' => $activity,
            'mot_de_passe' => $password,
            'mail' => $mail,
        ]);

        return $req->fetchAll(PDO::FETCH_CLASS, Users::class);
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

    public function getUpdate($name, $first_name, $activity, $password, $mail)
    {
        $query = 'UPDATE users SET nom = :nom, prénom = :prénom, activité= :activité, mot_de_passe= :mot_de_passe, mail= :mail
        WHERE id_users = :id_users';

        $req = $this->getDb()->prepare($query);

        $req->execute([
            'nom' => $name,
            'prénom' => $first_name,
            'activité' => $activity,
            'mot_de_passe' => $password,
            'mail' => $mail,
        ]);

        return $req->fetchAll(PDO::FETCH_CLASS, Users::class);
    }
}
