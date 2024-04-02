<?php

class CoursRepository {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAll() {
        $stmt = $this->pdo->query('SELECT * FROM Cours');
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'Cours');
        return $stmt->fetchAll();
    }

    public function getById($id) {
        $stmt = $this->pdo->prepare('SELECT * FROM Cours WHERE id = :id');
        $stmt->bindValue(':id', $id);
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'Cours');
        $stmt->execute();
        return $stmt->fetch();
    }

    public function create($jour, $periode, $idPromo) {
        $stmt = $this->pdo->prepare('INSERT INTO Cours (jour, periode, id_promo) VALUES (:jour, :periode, :idPromo)');
        $stmt->bindValue(':jour', $jour);
        $stmt->bindValue(':periode', $periode);
        $stmt->bindValue(':idPromo', $idPromo);
        $stmt->execute();
        return $this->pdo->lastInsertId();
    }

    public function update($id, $jour, $periode, $idPromo) {
        $stmt = $this->pdo->prepare('UPDATE Cours SET jour = :jour, periode = :periode, id_promo = :idPromo WHERE id = :id');
        $stmt->bindValue(':id', $id);
        $stmt->bindValue(':jour', $jour);
        $stmt->bindValue(':periode', $periode);
        $stmt->bindValue(':idPromo', $idPromo);
        $stmt->execute();
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare('DELETE FROM Cours WHERE id = :id');
        $stmt->bindValue(':id', $id);
        $stmt->execute();
    }
}
