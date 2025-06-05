function getProducts(){
    document.getElementById('cardHeader').innerHTML = '<h4>Lista de productos</h4>'
    document.getElementById('info').innerHTML = ' '
    fetch("https://fakestoreapi.com/products", {
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
            let listProducts = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">title</th>
                            <th scope="col">price</th>
                            <th scope="col">description</th>
                            <th scope="col">category</th>
                            <th scope="col">image</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                <tbody>
            `
            response.body.forEach(product => {
                listProducts = listProducts.concat(`
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.title}</td>
                        <td>${product.price}</td>
                       <td>${product.description}</td>
                        <td>${product.category}</td>
                         <td><img src="${product.image}" class="img-thumbnail" alt="Avatar del usuario"></td>
                        <td>
                            <button type="button" class="btn btn-outline-info" onclick="showInfoProduct('${product.id}')">View</button>
                        </td>
                    </tr>  
                    `)
                
            })
          
            document.getElementById('info').innerHTML = listProducts
        }
        else{
            document.getElementById('info').innerHTML = '<h3>No se encontraron productos</h3>'
        }
    })
}

function showInfoProduct(productId) {
    fetch("https://fakestoreapi.com/products/" + productId, {
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
                showModalProduct(response.body)
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontro el producto</h3>'
            }
        })
}

function showModalProduct(product) {
    const modalProduct = `
        <!-- Modal -->
        <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Show product</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="Avatar user">
                            <div class="card-body">
                                <h5 class="card-title">Product Info</h5>
                                <p class="card-text">Id: ${product.id}</p>
                                <p class="card-text">Title: ${product.title}</p>
                                <p class="card-text">Price: ${product.price}</p>
                                <p class="card-text">Description: ${product.description}</p>
                                <p class="card-text">Category: ${product.category}</p>  
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
    document.getElementById('showModal').innerHTML = modalProduct
    const modal = new bootstrap.Modal(document.getElementById('modalProduct'))
    modal.show()
}