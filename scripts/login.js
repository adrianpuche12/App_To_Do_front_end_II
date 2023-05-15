window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0];
    const email = document.querySelector("#inputEmail");
    const password = document.querySelector("#inputPassword");
    const url = "https://petstore.swagger.io/v2";
//  const url = "http://todo-api.ctd.academy:3000/v1";


    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const payload = {
            email: email.value,
            password: password.value
        }

        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            Headers: {
                "Constent-type": "application/json"
            }
        }
        realizarLogin(settings);
        form.reset();

    });

    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
        console.log("lanzando consulta a la API");

        fetch(`${url}/users/login`, settings)

            .then(Response => {
                console.log(Response);
                if (Response.ok != true) {
                    alert("Alguno de los datos es incorrecto");
                }
                return Response.json();
            })
            .then(data => {
                console.log("promesa complida");
                console.log(data);

                if (data.jwt) {
                    localStorage.setItem("jwt",JSON.stringify(data))
                    location.replace("./mis_tareas.htnl")
                }
            })
    };
});