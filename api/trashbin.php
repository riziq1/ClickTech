<?php
$data = array();

function trashRead($conn, $trashid = null)
{
    $query = "SELECT * FROM trashbin";

    if(!is_null($trashid))
    {
        $query = "SELECT * FROM trashbin WHERE trash_id = ".$trashid."";
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

function trashUpdateRead($conn, $trashid = null)
{
    $query = "SELECT trashbin.*, datasensor_update.trash_id AS sensor_data_id, datasensor_update.data_sensor_update, datasensor_update.timestamp FROM trashbin LEFT JOIN datasensor_update ON trashbin.trash_id = datasensor_update.trash_id";

    if(!is_null($trashid))
    {
        $query = "SELECT trashbin.*, datasensor_update.trash_id AS sensor_data_id, datasensor_update.data_sensor_update, datasensor_update.timestamp FROM trashbin LEFT JOIN datasensor_update ON trashbin.trash_id = sensor_data_id WHERE trashbin.trash_id = ".$trashid."";
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

function trashCreate($conn, $trashname, $floorlevel)
{
    $data['time'] = time();
    $query = "INSERT INTO trashbin (name, floor_level) VALUES ('".$trashname."', ".$floorlevel.")";
    if($conn->query($query) == TRUE)
    {
        $data['status'] = 'success';
        echo json_encode($data);
    } else {
        $data['status'] = 'fail';
        echo json_encode($data);
    }
}

function trashUpdate($conn, $input, $trashid)
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

function trashEdit($conn, $trashname, $floorlevel, $trashid)
{
    $data['time'] = time();
    $query = "UPDATE trashbin SET  name = '".$trashname."', floor_level = ".$floorlevel." WHERE trash_id = ".$trashid."";
    if($conn->query($query) == TRUE)
    {
        $data['status'] = 'success';
        echo json_encode($data);
    } else {
        $data['status'] = 'fail';
        echo json_encode($data);
    }
}

function trashDelete($conn, $trashid)
{
    $data['time'] = time();
    $query = "DELETE FROM trashbin WHERE trash_id = ".$trashid."";
    if($conn->query($query) == TRUE)
    {
        $data['status'] = 'success';
        echo json_encode($data);
    } else {
        $data['status'] = 'fail';
        echo json_encode($data);
    }
}
