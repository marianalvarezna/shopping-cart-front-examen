function getProducts(){
    document.getElementById('cardHeader').innerHTML = '<h4><i class="fa-solid fa-box"></i> Lista de productos</h4>'
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
                <button type="button" class="btn btn-outline-success" onclick="addProduct()"><i class="fa-solid fa-box"></i>+</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Image</th>
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
                            <button type="button" class="btn btn-outline-info" onclick="showInfoProduct('${product.id}')"><i class="fa-solid fa-eye"></i></button>
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
                        <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-box"></i> Show product</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="Avatar product">
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

function addProduct(){
    const modalProduct = `
        <!-- Modal -->
        <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-box"></i>+ Add Product</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <form id="formAddProduct"> 
                                    <div class="mb-3">
                                        <label for="id" class="form-label">Id</label>
                                        <input type="text" class="form-control" id="id" placeholder="Id input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="title" class="form-label">Title</label>
                                        <input type="text" class="form-control" id="title" placeholder="Title input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="price" class="form-label">Price</label>
                                        <input type="text" class="form-control" id="price" placeholder="Price input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="description" class="form-label">Description</label>
                                        <input type="text" class="form-control" id="description" placeholder="Description input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="category" class="form-label">Category</label>
                                        <input type="text" class="form-control" id="category" placeholder="Category input" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="image" class="form-label">Image</label>
                                        <input type="url" class="form-control" id="image" placeholder="Image input" required>
                                    </div>
                                    <div class="mb-3 text-center">
                                        <button class="btn btn-success" type="button" onclick="saveProduct()"><i class="fa-solid fa-floppy-disk"></i> Save</button>
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
    document.getElementById('showModal').innerHTML = modalProduct
    const modal = new bootstrap.Modal(document.getElementById('modalProduct'))
    modal.show()
}

function saveProduct(){
    const form = document.getElementById('formAddProduct')
    if(form.checkValidity()){
        const id = document.getElementById('id').value
        const title = document.getElementById('title').value
        const price = document.getElementById('price').value
        const description = document.getElementById('description').value
        const category = document.getElementById('category').value
        const image = document.getElementById('image').value
        const productData = {id, title, price, description, category, image}

        fetch("https://fakestoreapi.com/products/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(productData)
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
                    document.getElementById('info').innerHTML = '<h3>The product was register success!</h3>'
                }
                else{
                    document.getElementById('info').innerHTML = '<h3>The product was register error!</h3>'
                }
                const modalId = document.getElementById('modalProduct')
                const modal = bootstrap.Modal.getInstance(modalId)
                modal.hide()
            })
    }
    else{
        form.reportValidity()
    }
}