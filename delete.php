<?php
    include('db.php');
    $data = stripslashes(file_get_contents("php://input"));
    $fin = json_decode($data, true);
    $id = $fin['sid'];

    if (! empty($id)){
        $sql = "DELETE FROM products WHERE productId = {$id}";
        $sql1 = "DELETE FROM inventory WHERE productId = {$id}";
        $conn->query($sql1);
        if ($conn->query($sql)) echo "Done";
        else echo "Not deleted";
    }
    else echo "Fill all fields";
?>