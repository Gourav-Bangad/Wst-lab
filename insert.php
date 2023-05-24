<?php
    include('db.php');
    $data = stripslashes(file_get_contents("php://input"));
    $final = json_decode($data, true);
    $name = $final['nm'];
    $des = $final['des'];
    $quan = $final['qua'];
    $pric = $final['pri'];

    if (! empty($name) && ! empty($des) && ! empty($quan) && !empty($pric)) {
        $sql = "INSERT INTO products(productId,ProductName, Description, UnitPrice,ImageId) VALUES ('$id','$name', '$des', '$pric','$imgid')";
        $sql1 = "INSERT INTO inventory(productId,QuantityAvail) VALUES ('$id','$quan')";
        if ($conn->query($sql)) echo "Saved !";
        else echo "Not saved";
        if ($conn->query($sql1)) echo "Saved !";
        else echo "Not saved";
    }
    else echo "Fill all";
?>