<?php

class Cours
{
    private $id, $jour, $periode, $idPromo;
    public function __construct($id, $jour, $periode, $idPromo)
    {
        $this->id = $id;
        $this->jour = $jour;
        $this->periode = $periode;
        $this->idPromo = $idPromo;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getJour()
    {
        return $this->jour;
    }

    public function getPeriode()
    {
        return $this->periode;
    }

    public function getIdPromo()
    {
        return $this->idPromo;
    }

    public function setJour($jour)
    {
        $this->jour = $jour;
    }

    public function setPeriode($periode)
    {
        $this->periode = $periode;
    }

    public function setIdPromo($idPromo)
    {
        $this->idPromo = $idPromo;
    }
}
