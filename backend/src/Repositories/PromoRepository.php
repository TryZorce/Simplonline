<?php

class PromoRepository {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->query('SELECT * FROM Promo');
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'Promo');
        return $stmt->fetchAll();
    }

    public function getById($id) {
        $stmt = $this->pdo->prepare('SELECT * FROM Promo WHERE id_promo = :id');
        $stmt->bindValue(':id', $id);
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'Promo');
        $stmt->execute();
        return $stmt->fetch();
    }

    public function create($nom, $dateDebut, $dateFin, $places) {
        $stmt = $this->pdo->prepare('INSERT INTO Promo (nom, date_debut, date_fin, places) VALUES (:nom, :dateDebut, :dateFin, :places)');
        $stmt->bindValue(':nom', $nom);
        $stmt->bindValue(':dateDebut', $dateDebut);
        $stmt->bindValue(':dateFin', $dateFin);
        $stmt->bindValue(':places', $places);
        $stmt->execute();
        return $this->pdo->lastInsertId();
    }

    public function update($id, $nom, $dateDebut, $dateFin, $places) {
        $stmt = $this->pdo->prepare('UPDATE Promo SET nom = :nom, date_debut = :dateDebut, date_fin = :dateFin, places = :places WHERE id_promo = :id');
        $stmt->bindValue(':id', $id);
        $stmt->bindValue(':nom', $nom);
        $stmt->bindValue(':dateDebut', $dateDebut);
        $stmt->bindValue(':dateFin', $dateFin);
        $stmt->bindValue(':places', $places);
        $stmt->execute();
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare('DELETE FROM Promo WHERE id_promo = :id');
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }
}
