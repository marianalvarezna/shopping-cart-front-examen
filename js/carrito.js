function getCarrito(){
    document.getElementById('cardHeader').innerHTML = '<h4><i class="fa-solid fa-cart-shopping"></i> Lista de Compras</h4>'
    document.getElementById('info').innerHTML = ' '
    fetch("https://fakestoreapi.com/carts", {
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
        if(response.status === 200){
            let listCarrito = `
            <button type="button" class="btn btn-outline-success" onclick="addCarrito()"><i class="fa-solid fa-cart-plus"></i></button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">UserId</th>
                            <th scope="col">Date</th>
                            <th scope="col">Products</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                <tbody>
            `
            response.body.forEach(carrito => {
                listCarrito = listCarrito.concat(`
                    <tr>
                        <td>${carrito.id}</td>
                        <td>${carrito.userId}</td>
                        <td>${carrito.date}</td>
                       <td>${carrito.products[0].productId}</td>
                        <td>${carrito.products[0].quantity}</td>
                        <td>
                            <button type="button" class="btn btn-outline-info" onclick="showInfoCarrito ('${carrito.id}')"><i class="fa-solid fa-eye"></i></button>
                        </td>
                    </tr>  
                    `)
                
            })
          
            document.getElementById('info').innerHTML = listCarrito
        }
        else{
            document.getElementById('info').innerHTML = '<h3>No se encontraron productos</h3>'
        }
    })
}

function showInfoCarrito(carritoId) {
    fetch("https://fakestoreapi.com/carts/" + carritoId, {
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
                showModalCarrito(response.body)
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontro el producto</h3>'
            }
        })
}

function showModalCarrito(carrito) {
    const modalCarrito = `
        <!-- Modal -->
        <div class="modal fade" id="modalCarrito" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-cart-shopping"></i> Show carrito</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Product Info</h5>
                                <p class="card-text">Id: ${carrito.id}</p>
                                <p class="card-text">UserId: ${carrito.userId}</p>
                                <p class="card-text">Date: ${carrito.date}</p>
                                <p class="card-text">Products: ${carrito.products[0].productId}</p>
                                 <p class="card-text">Quantity: ${carrito.products[0].quantity}</p>
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
    document.getElementById('showModal').innerHTML = modalCarrito
    const modal = new bootstrap.Modal(document.getElementById('modalCarrito'))
    modal.show()
}

function addCarrito(){
    const modalCarrito = `
        <!-- Modal -->
        <div class="modal fade" id="modalCarrito" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-cart-plus"></i> Add Carrito</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <form id="formAddCarrito"> 
                                    <div class="mb-3">
                                        <label for="id" class="form-label">Id</label>
                                        <input type="text" class="form-control" id="id" placeholder="Id input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="userId" class="form-label">UserId</label>
                                        <input type="text" class="form-control" id="userId" placeholder="UserId input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="date" class="form-label">Date</label>
                                        <input type="text" class="form-control" id="date" placeholder="Date input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="products" class="form-label">Products</label>
                                        <input type="text" class="form-control" id="products" placeholder="Products input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="quantity" class="form-label">Quantity</label>
                                        <input type="text" class="form-control" id="quantity" placeholder="Quantity input" required>
                                    </div>
                                    <div class="mb-3 text-center">
                                        <button class="btn btn-success" type="button" onclick="saveCarrito()"><i class="fa-solid fa-floppy-disk"></i> Save</button>
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
    document.getElementById('showModal').innerHTML = modalCarrito
    const modal = new bootstrap.Modal(document.getElementById('modalCarrito'))
    modal.show()
}

function saveCarrito(){
    const form = document.getElementById('formAddCarrito')
    if(form.checkValidity()){
        const id = document.getElementById('id').value
        const userId = document.getElementById('userId').value
        const date = document.getElementById('date').value
        const products = document.getElementById('products').value
        const quantity = document.getElementById('quantity').value
        const CarritoData = {id, userId, date, products, quantity}

        fetch("https://fakestoreapi.com/carts/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(CarritoData)
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
                    document.getElementById('info').innerHTML = '<h3>The cart was register success!</h3>'
                }
                else{
                    document.getElementById('info').innerHTML = '<h3>The cart was register error!</h3>'
                }
                const modalId = document.getElementById('modalCarrito')
                const modal = bootstrap.Modal.getInstance(modalId)
                modal.hide()
            })
    }
    else{
        form.reportValidity()
    }
}