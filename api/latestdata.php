<?php

function latestDataRead($conn, $trashid = null)
{
    $query = "SELECT * FROM datasensor_update LEFT JOIN trashbin ON datasensor_update.trash_id = trashbin.trash_id";

    if(!is_null($trashid))
    {
        $query = "SELECT * FROM datasensor_update LEFT JOIN trashbin ON datasensor_update.trash_id = trashbin.trash_id  WHERE trash_id = ".$trashid."";
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

function latestDataUpdate($conn, $input, $trashid)
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