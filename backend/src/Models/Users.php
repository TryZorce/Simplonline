<?php

class Users
{
    private $id_users;
    private $name;
    private $surname;
    private $activity;
    private $password;
    private $mail;
    

    /**
     * Get the value of id_users
     */ 
    public function getId_users()
    {
        return $this->id_users;
    }

    /**
     * Set the value of id_users
     *
     * @return  self
     */ 
    public function setId_users($id_users)
    {
        $this->id_users = $id_users;

        return $this;
    }

    /**
     * Get the value of name
     */ 
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of surname
     */ 
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * Set the value of surname
     *
     * @return  self
     */ 
    public function setSurname($surname)
    {
        $this->surname = $surname;

        return $this;
    }

    /**
     * Get the value of activity
     */ 
    public function getActivity()
    {
        return $this->activity;
    }

    /**
     * Set the value of activity
     *
     * @return  self
     */ 
    public function setActivity($activity)
    {
        $this->activity = $activity;

        return $this;
    }

    /**
     * Get the value of password
     */ 
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set the value of password
     *
     * @return  self
     */ 
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get the value of mail
     */ 
    public function getMail()
    {
        return $this->mail;
    }

    /**
     * Set the value of mail
     *
     * @return  self
     */ 
    public function setMail($mail)
    {
        $this->mail = $mail;

        return $this;
    }
}
