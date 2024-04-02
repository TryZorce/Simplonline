<?php

require_once __DIR__ . '/../Services/Response.php';
require_once __DIR__ . '/../Services/Cors.php';

class StudentController
{
    use Response;
    use Cors;

    public function getAllStudent()
    {
        //echo (json_encode('Hello from getAllStudent - StudentController'));
        $studentRepository = new StudentRepository();
        $students = $studentRepository->getAll();

        $jsonReponse = json_encode($students);

        header('Content-Type: application/json');

        echo ($jsonReponse);
    }
}
