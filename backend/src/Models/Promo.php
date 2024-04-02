<?php

class Promo
{
    private $id, $nom, $dateDebut, $dateFin, $places;

    public function __construct($id, $nom, $dateDebut, $dateFin, $places)
    {
        $this->id = $id;
        $this->nom = $nom;
        $this->dateDebut = $dateDebut;
        $this->dateFin = $dateFin;
        $this->places = $places;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNom()
    {
        return $this->nom;
    }

    public function getDateDebut()
    {
        return $this->dateDebut;
    }

    public function getDateFin()
    {
        return $this->dateFin;
    }

    public function getPlaces()
    {
        return $this->places;
    }

    public function setNom($nom)
    {
        $this->nom = $nom;
    }

    public function setDateDebut($dateDebut)
    {
        $this->dateDebut = $dateDebut;
    }

    public function setDateFin($dateFin)
    {
        $this->dateFin = $dateFin;
    }

    public function setPlaces($places)
    {
        $this->places = $places;
    }
}
