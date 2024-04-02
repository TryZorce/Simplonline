<?php

class CoursRepository extends Database{

    public function getAll() {
        $stmt = $this->getDb()->query('SELECT * FROM Cours');
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'Cours');
        return $stmt->fetchAll();
    }

    public function getById($id) {
        $stmt = $this->getDb()->prepare('SELECT * FROM Cours WHERE id = :id');
        $stmt->bindValue(':id', $id);
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'Cours');
        $stmt->execute();
        return $stmt->fetch();
    }

    public function create($jour, $periode, $idPromo) {
        $stmt = $this->getDb()->prepare('INSERT INTO Cours (jour, periode, id_promo) VALUES (:jour, :periode, :idPromo)');
        $stmt->bindValue(':jour', $jour);
        $stmt->bindValue(':periode', $periode);
        $stmt->bindValue(':idPromo', $idPromo);
        $stmt->execute();
        return $this->getDb()->lastInsertId();
    }

    public function update($id, $jour, $periode, $idPromo) {
        $stmt = $this->getDb()->prepare('UPDATE Cours SET jour = :jour, periode = :periode, id_promo = :idPromo WHERE id = :id');
        $stmt->bindValue(':id', $id);
        $stmt->bindValue(':jour', $jour);
        $stmt->bindValue(':periode', $periode);
        $stmt->bindValue(':idPromo', $idPromo);
        $stmt->execute();
    }

    public function delete($id) {
        $stmt = $this->getDb()->prepare('DELETE FROM Cours WHERE id = :id');
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }
}
