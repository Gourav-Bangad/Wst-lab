document.getElementById("btn-add").addEventListener("click", add_product);

function add_product(e){
    e.preventDefault();
    var nm = document.getElementById("Name").value;
    var des = document.getElementById("Desc").value;
    var qua = document.getElementById("Quan").value;
    var pri = document.getElementById("Price").value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "insert.php", true);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onload = ()=>{
        if (xhr.status === 200) {
            console.log(xhr.response);
            showInvent();
        }
        else console.log("Probelm");
    }
    const data = {nm :nm ,des: des , qua: qua, pri: pri};
    xhr.send(JSON.stringify(data));
}


const tbody = document.getElementById("tbody");
function showInvent() {
    tbody.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "retrieve.php", true);
    xhr.responseType = "json";
    xhr.onload = ()=>{
        if (xhr.status === 200) {
            if (xhr.response)
            {
                x = xhr.response;
            } 
            else x = "";
            for (i=0; i<x.length; i++) {
                tbody.innerHTML += "<tr><td>" + x[i].productId  + "</td><td>" + 
                x[i].ProductName+ "</td><td>" + 
                x[i].Description + 
                                    "</td><td>" + 
                                    x[i].QuantityAvail
                                     + "</td><td>" + 
                                    x[i].UnitPrice + "</td><td>" + 
                                    "<button class='btn btn-warning btn-sm btn-edit' data-sid="+
                                    x[i].productId + ">Edit </button> <button class='btn btn-danger btn-sm btn-del' data-sid="+
                                    x[i].productId + ">Delete </button> </td></tr>"
            }
        }
        del();
    }
    xhr.send();
}
showInvent();

function del() {
    var x = document.getElementsByClassName("btn-del");
    for (let i=0; i<x.length; i++) {
        x[i].addEventListener("click", function () {
            id = x[i].getAttribute("data-sid");
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "delete.php", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            
            xhr.onload = ()=>{
                if (xhr.status === 200) {
                    showInvent();
                }
                else console.log("Problem in deletion");
            }
            const mydata = {sid: id};
            xhr.send(JSON.stringify(mydata));
        })
    }
}

function edit() {
    var x = document.getElementsByClassName("btn-edit");
    
    var nm = document.getElementById("Name");
    var des = document.getElementById("Desc");
    var qua = document.getElementById("Quan");
    var pri = document.getElementById("Price");
    
    for (let i=0; i<x.length; i++) {
        x[i].addEventListener("click", function () {
            id = x[i].getAttribute("data-sid");
            const mydata = {sid: id};
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "insert.php", true);
            xhr.responseType = "json";
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = ()=>{
                if (xhr.status === 200) {
                    a = xhr.response;
                    console.log(a);
                    id.value = a.ProductId;
                    nm.value = a.ProductName;
                    des.value = a.Description
                    qua.value = a.QuantityAvail;
                    pri.value = a.UnitPrice;
                }
                else
                {
                    console.log("Problem in edit");
                } 
            }
            const data = JSON.stringify(mydata)
            console.log(data);
            xhr.send(data);
        })
    }
}