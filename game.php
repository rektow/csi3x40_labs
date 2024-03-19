<?php

function rollDice() {
    
    $_SESSION['dice'] = array_map(function() { return rand(1, 6); }, range(1, 5));
    sendResponse(['dice' => $_SESSION['dice']]);
}

function holdDice($diceIndex) {
    
    $_SESSION['heldDice'][] = $_SESSION['dice'][$diceIndex];
    sendResponse(['heldDice' => $_SESSION['heldDice']]);
}


function sendResponse($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
