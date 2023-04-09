function getAllCustomers() {
    $.ajax({
        // type: get, post, put or delete
        type: "GET",
        // url: link
        url: "http://localhost:8080/customers",
        // processing when calling data successfully
        success: function (foreseen) {
            console.log(foreseen);
            // redraw the board
            let content = ""
            for (let i = 0; i < foreseen.length; i++) {
                content += `<tr>
                                <td>${foreseen[i].firstName}</td>
                                <td>${foreseen[i].lastName}</td>
                                <td>
                                    <button>
                                        <a style="text-decoration: none; color: black" href="view.html?id=${foreseen[i].id}">view</a>
                                    </button>
                                    <button>
                                        <a style="text-decoration: none; color: black" href="edit.html?id=${foreseen[i].id}">edit</a>
                                    </button>
                                    <button onclick="deleteById(${foreseen[i].id})">delete</button>
                                </td>
                            </tr>`
            }
            document.getElementById('content').innerHTML = content;
        }
    });
    event.preventDefault();
}
getAllCustomers();

function addNewCustomer() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let newCustomer = {
        "firstName": firstName,
        "lastName": lastName,
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCustomer),
        url: "http://localhost:8080/customers/create",
        success: function (foreseen) {
            getAllCustomers();
        }
    });
    event.preventDefault();
}

function deleteById(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/customers/delete/" + id,
        success: function () {
            getAllCustomers();
        }
    });
}

function updateById() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let newCustomer = {
        "id": id,
        "firstName": firstName,
        "lastName": lastName,
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newCustomer),
        url: "http://localhost:8080/customers/edit/" + id,
        success: function (foreseen) {
            getAllCustomers();
        }
    });
    event.preventDefault();
}

function showDetailCustomerInformation() {

}