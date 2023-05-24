<?php
include 'db.php';
$sql1 = "CREATE TABLE products (
    Productid INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Productname VARCHAR(30) ,
    Productdesc VARCHAR(30), 
    Unitprice INT(6) ,
    ImangeiD VARCHAR(30),
    )";
    
    $conn->query($sql);

// sql to create table
$sql2 = "CREATE TABLE  inventory (
    Productid INT(6) NOT NULL,
    Quantity INT(6) NOT NULL,
    FOREIGN KEY (id) REFERENCES products(Productid)
    )";
    $conn->query($sql2);
    if (mysqli_query($conn, $sql)) {
      echo "Table qty created successfully";
    } else {
      echo "Error creating table: " . mysqli_error($conn);
    }
  ?>