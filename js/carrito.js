function getCarrito(){
    document.getElementById('cardHeader').innerHTML = '<h4>Lista de Compras</h4>'
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
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">userId</th>
                            <th scope="col">date</th>
                            <th scope="col">products</th>
                            <th scope="col">quantity</th>
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
                            <button type="button" class="btn btn-outline-info" onclick="showInfoCarrito ('${carrito.id}')">View</button>
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
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Show product</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Product Info</h5>
                                <p class="card-text">Id: ${carrito.id}</p>
                                <p class="card-text">userId: ${carrito.userId}</p>
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