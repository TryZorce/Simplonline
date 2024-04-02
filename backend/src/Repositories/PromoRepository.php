<?php

class PromoRepository extends Database{


    public function getAll() {
        $stmt = $this->getDb()->query('SELECT * FROM Promo');
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'Promo');
        return $stmt->fetchAll();
    }

    public function getById($id) {
        $stmt = $this->getDb()->prepare('SELECT * FROM Promo WHERE id_promo = :id');
        $stmt->bindValue(':id', $id);
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'Promo');
        $stmt->execute();
        return $stmt->fetch();
    }

    public function create($nom, $dateDebut, $dateFin, $places) {
        $stmt = $this->getDb()->prepare('INSERT INTO Promo (nom, date_debut, date_fin, places) VALUES (:nom, :dateDebut, :dateFin, :places)');
        $stmt->bindValue(':nom', $nom);
        $stmt->bindValue(':dateDebut', $dateDebut);
        $stmt->bindValue(':dateFin', $dateFin);
        $stmt->bindValue(':places', $places);
        $stmt->execute();
        return $this->getDb()->lastInsertId();
    }

    public function update($id, $nom, $dateDebut, $dateFin, $places) {
        $stmt = $this->getDb()->prepare('UPDATE Promo SET nom = :nom, date_debut = :dateDebut, date_fin = :dateFin, places = :places WHERE id_promo = :id');
        $stmt->bindValue(':id', $id);
        $stmt->bindValue(':nom', $nom);
        $stmt->bindValue(':dateDebut', $dateDebut);
        $stmt->bindValue(':dateFin', $dateFin);
        $stmt->bindValue(':places', $places);
        $stmt->execute();
    }

    public function delete($id) {
        $stmt = $this->getDb()->prepare('DELETE FROM Promo WHERE id_promo = :id');
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }
}
