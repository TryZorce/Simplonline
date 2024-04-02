<?php

trait Cors
{
    public function __construct()
    {
        $this->handleCors();
    }

    protected function handleCors()
    {
        header("Access-Control-Allow-Origin: " . CORS_ALLOWED_ORIGINS);
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }
}
