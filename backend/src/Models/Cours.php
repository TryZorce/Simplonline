<?php

class Cours
{
    private $id, $jour, $periode, $idPromo;

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
