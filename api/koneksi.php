<?php
// menggunakan mysqli_connect
function openConnection()
{
    //Variabel database
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "smartdb";
    $conn = new mysqli($servername, $username, $password, $dbname) or die("Failed connect: %s\n" . $conn->error);
    return $conn;
}

function closeCon($conn)
{
    $conn->close();
}
