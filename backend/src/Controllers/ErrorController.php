<?php

require_once __DIR__ . '/../Services/Response.php';
require_once __DIR__ . '/../Services/Cors.php';

class ErrorController
{
    use Response;
    use Cors;

    public function notFound()
    {
        echo"<p>Cette page n'existe pas.</p> <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\">Retourner à la page d'accueil</a>";

    }
}