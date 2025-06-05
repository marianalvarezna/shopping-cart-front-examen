document.getElementById("formLogin").addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    login(username, password)
})

function login(username, password){
    let message = ''
    let alerType = ''
    localStorage.removeItem('token')

    fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json" 
        },
        body: JSON.stringify({username, password})
    })
    
    .then((response) =>{
        console.log("login", response)
        if(response.status === 200){
            alerType = 'success'
            message = 'Inicio de sesión exitoso';
            console.log('Responde bien' + response)
            alertBuilder(alerType, message)
            response.json().then((data) => {
                localStorage.setItem('token', data.token)
            })
            setTimeout(() => {
                location.href = 'admin/dashboard.html'
            }, 2000) //2000 ms = 2 seg           
                
        }
        else{
            alerType = 'danger'
            message = 'usuario o contraeña incorrectos';
            alertBuilder(alerType, message)
        }
    })

    .catch((error) => {
        alerType = 'danger'
        message = 'Error inesperado';
        console.log(error)
        alertBuilder(alerType, message)
    })
}

function alertBuilder(alerType, message){
    const alert = `
        <div class="alert alert-${alerType} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.getElementById('alert').innerHTML = alert;
}
