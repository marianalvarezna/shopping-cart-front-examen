function getUsers() {
    document.getElementById('cardHeader').innerHTML = '<h4><i class="fa-solid fa-users"></i> Listado de usuarios</h4>';
    fetch("https://fakestoreapi.com/users", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
    })
    
    .then((result) => {
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })

    .then((response) => {
        if (response.status === 200) {
            let listUsers = `
                <button type="button" class="btn btn-outline-success" onclick="addUser()"><i class="fa-solid fa-user-plus"></i></button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                <tbody>
            `

            response.body.forEach(user => {
                listUsers = listUsers.concat(`
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name.firstname}</td>
                        <td>${user.name.lastname}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td><button class="btn btn-outline-info" onclick="showInfoUser(${user.id})"><i class="fa-solid fa-eye"></i></button></td>
                    </tr>
                `) 
            })

            document.getElementById('info').innerHTML = listUsers;
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontraron usuarios</h3>';
        }
    })
    .catch(error => {
        document.getElementById('info').innerHTML = '<h3>Error al obtener los usuarios</h3>';
        console.error(error);
    });
}

function showInfoUser(userId) {
    fetch("https://fakestoreapi.com/users/" + userId, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
    })

        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status,
                        body: data
                    }
                }
            )
        })

        .then((response) => {
            if (response.status === 200) {
                showModalUser(response.body)
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontro el usuario</h3>'
            }
        })
}

function showModalUser(user) {
    const modalUser = `
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5"><i class="fa-solid fa-user"></i> Show User</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">User Info</h5>
                                <p class="card-text">First name: ${user.name.firstname}</p>
                                <p class="card-text">Last name: ${user.name.lastname}</p>
                                <p class="card-text">Email: ${user.email}</p>
                                <p class="card-text">Phone: ${user.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `
    document.getElementById('showModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('modalUser'))
    modal.show()
}

function addUser(){
    const modalUser = `
        <!-- Modal -->
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user-plus"></i> Add User</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <form id="formAddUser"> 
                                    <div class="mb-3">
                                        <label for="first_name" class="form-label">First name</label>
                                        <input type="text" class="form-control" id="first_name" placeholder="First name input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="last_name" class="form-label">Last name</label>
                                        <input type="text" class="form-control" id="last_name" placeholder="Last name input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" placeholder="Email input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="phone" class="form-label">Phone</label>
                                        <input type="text" class="form-control" id="phone" placeholder="Phone input" required>
                                    </div>
                                    <div class="mb-3 text-center">
                                        <button class="btn btn-success" type="button" onclick="saveUser()"><i class="fa-solid fa-floppy-disk"></i> Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `
    document.getElementById('showModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('modalUser'))
    modal.show()
}

function saveUser(){
    const form = document.getElementById('formAddUser')
    if(form.checkValidity()){
        const first_name = document.getElementById('first_name').value
        const last_name = document.getElementById('last_name').value
        const email = document.getElementById('email').value
        const phone = document.getElementById('phone').value
        const userData = {first_name, last_name, email, phone}

        fetch("https://fakestoreapi.com/users/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData)
        })
    
            .then((result) => {
                return result.json().then(
                    data => {
                        return {
                            status: result.status,
                            body: data
                        }
                    }
                )
            })

            .then((response) =>{
                if(response.status === 201){
                    document.getElementById('info').innerHTML = '<h3>The user was register success!</h3>'
                }
                else{
                    document.getElementById('info').innerHTML = '<h3>The user was register error!</h3>'
                }
                const modalId = document.getElementById('modalUser')
                const modal = bootstrap.Modal.getInstance(modalId)
                modal.hide()
            })
    }
    else{
        form.reportValidity()
    }
}