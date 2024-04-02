<?php

trait Response
{
    public function render($template, $data = null)
    {
        if (is_array($data) && !empty($data)) {
            extract($data);
        }

        include_once __DIR__ . '/../Templates/' . $template . ".php";
    }
}
