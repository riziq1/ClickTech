<?php
// array holding allowed Origin domains
function cors() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
}

cors();

include 'koneksi.php';
include 'datasensor.php';
include 'trashbin.php';
include 'latestdata.php';

$conn = openConnection();

$mode = $_SERVER['QUERY_STRING'];
$qry = array();
parse_str($mode, $qry);

$modeTest = array_key_exists('mode', $qry);
$trashIdTest = array_key_exists('trashid', $qry);
$dataSensorTest = array_key_exists('sensordata', $qry);
$createTrashName = array_key_exists('trashname', $qry);
$createTrashFloor = array_key_exists('trashfloor', $qry);

if ($modeTest) {
    switch ($qry['mode']) {
        default:
            if ($trashIdTest) {
                dataRead($conn, $qry['trashid']);
            } else {
                dataRead($conn);
            }
            break;

        case 'latest':
            if ($trashIdTest) {
                latestDataRead($conn, $qry['trashid']);
            } else {
                latestDataRead($conn);
            }
            break;

        case 'trash':
            trashRead($conn);
            break;

        case 'trash_data':
            if ($trashIdTest)
            {
                trashUpdateRead($conn, $qry['trashid']);
            }
            else{
                trashUpdateRead($conn);
            }
            break;
        case 'trash_edit':
            if($trashIdTest  && $createTrashFloor & $createTrashName)
            {
                trashEdit($conn, $qry['trashname'], $qry['trashfloor'], $qry['trashid']);
            }
            else
            {
                echo json_encode(array('status' => 'failed', 'message' => 'Trash ID needed and trashname & trashfloor needed'));
            }
            break;
        case 'trash_delete':
            if ($trashIdTest)
            {
                trashDelete($conn, $qry['trashid']);
            }
            else
            {
                echo json_encode(array('status' => 'failed', 'message' => 'Trash ID needed'));
            }
            break;

        case 'trash_save':
            if ($createTrashName && $createTrashFloor)
            {
                trashCreate($conn, $qry['trashname'], $qry['trashfloor']);
            } else
            {
                echo json_encode(array('status' => 'failed', 'message' => 'Trash Name And Floor needed'));
            }
            break;

        case 'save':
            if ($dataSensorTest && $trashIdTest) {
                dataCreate($conn, $qry['sensordata'], $qry['trashid']);
                dataCreateUpdate($conn, $qry['sensordata'], $qry['trashid']);
            } else {
                echo json_encode(array('status' => 'failed', 'message' => 'sensor data or trash id cant be zero'));
            }
            break;

        case 'update':
            dataUpdate($conn, '66', $qry['trashid']);
            break;
    }
}
