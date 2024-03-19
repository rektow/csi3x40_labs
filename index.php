<?php
session_start();


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    switch ($_POST['action']) {
        case 'rollDice':
            require 'api/game.php';
            rollDice();
            break;
        case 'holdDice':
            require 'api/game.php';
            holdDice($_POST['diceIndex']);
            break;
        
    }
}

function sendResponse($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
