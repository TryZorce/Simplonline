<?php

class CoursRepository extends Database{

    public function getAll() {
        $req = $this->getDb()->query('SELECT * FROM Cours');

        $data = $req->fetchAll(PDO::FETCH_ASSOC);

        return $data;
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

    public function getCoursAndPromo() {
        $query = "
            SELECT 
                Cours.id,
                Cours.jour,
                Cours.periode,
                Promo.id_promo,
                Promo.nom AS nom_promo,
                Promo.date_début AS date_debut_promo,
                Promo.date_fin AS date_fin_promo,
                Promo.places AS places_promo
            FROM 
                Cours
            INNER JOIN 
                Promo ON Cours.id_promo = Promo.id_promo
        ";
    
        $req = $this->getDb()->prepare($query);
        $req->execute();
    
        return $req->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCoursJoinPromo() {
        $requete = $this->getDb()->query('SELECT * FROM cours JOIN promo ON cours.id_promo = promo.id_promo');
            
        $data = $requete->fetchAll(PDO::FETCH_ASSOC);
    
        $requete->closeCursor();
    
        return $data;
    }
    
}
