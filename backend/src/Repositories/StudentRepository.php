<?php

class StudentRepository extends Database
{
    public function getAll()
    {
        $req = $this->getDb()->query('SELECT * FROM student');

        $data = $req->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }
}