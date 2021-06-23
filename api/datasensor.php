<?php
$data = array();

function dataRead($conn, $trashid = null)
{
    $query = "SELECT * FROM datasensor ORDER BY timestamp DESC";

    if(!is_null($trashid))
    {
        $query = "SELECT * FROM datasensor WHERE trash_id = ".$trashid." ORDER BY timestamp DESC";
    }
    
    $result = $conn->query($query);
    $data['data'] = [];
    $data['time'] = time();

    if ($result->num_rows != 0) {
        $data['status'] = 'success';
        while ($row = $result->fetch_assoc()) {
            $data['data'][] = $row;
        }
        echo json_encode($data);
    } else {
        $data['status'] = 'no data';
        echo json_encode($data);
    }
}

function dataCreate($conn, $input, $trashid)
{
    $data['time'] = time();
    $query = "INSERT INTO datasensor (data_sensor, trash_id) VALUES ('".$input."', ".$trashid.")";
    if($conn->query($query) == TRUE)
    {
        $data['status'] = 'success';
        echo json_encode($data);
    } else {
        $data['status'] = 'fail';
        echo json_encode($data);
    }
}

function dataUpdate($conn, $input, $trashid)
{
    $data['time'] = time();
    $query = "UPDATE datasensor_update SET  data_sensor_update = ".$input." WHERE trash_id = ".$trashid."";
    if($conn->query($query) == TRUE)
    {
        $data['status'] = 'success';
        echo json_encode($data);
    } else {
        $data['status'] = 'fail';
        echo json_encode($data);
    }
}

function dataCreateUpdate($conn, $input, $trashid)
{
    $update = false;
    $queryCheck = "SELECT * FROM datasensor_update WHERE trash_id = ".$trashid."";
    if ($conn->query($queryCheck)->num_rows != 0)
    {
        $update = true;
    }
    
    if($update)
    {
        dataUpdate($conn, $input, $trashid);
    }
    else
    {
        $data['time'] = time();
        $query = "INSERT INTO datasensor_update (data_sensor_update, trash_id) VALUES ('".$input."', ".$trashid.")";
        if($conn->query($query) == TRUE)
        {
            $data['status'] = 'success';
            echo json_encode($data);
        } else {
            $data['status'] = 'fail';
            echo json_encode($data);
        }
    }
}
