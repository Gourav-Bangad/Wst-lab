<?php
    include('db.php');
    $sql = "SELECT *
    FROM products
    INNER JOIN inventory ON products.productId=inventory.productId;";
    
    $res = $conn->query($sql);
    if ($res->num_rows > 0) {
        $data = array();
        while ($row = $res->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    }
?>