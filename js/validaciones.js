//queremos que las funciones puedan reutilizarse por eso quitamos el adddEventListener de acá
export function validar(input){
    const tipo = input.dataset.tipo;//con este dataset lo que nosotros estamos obteniendo es la colección de todos los datas y el .tipo es para obtener justamente este.proviene del html
    if (validadores[tipo]) {
        //preguntamos si en validadores exite el tipo de arriba.
        validadores[tipo](input);//si existe le pasamos como parametro el input
    }
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML =
        mostrarMensajeDeError(tipo, input);
    }
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];
    ///definiremos los tipos de errores de los inputs
const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch:
            "6 a 12 caracteres, mínimo una letra minúscula, una ayúscula y un número. No puede contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:'El formato requerido es XXXXXXXXXX'
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:'La dirección debe contar entre 3 y 30 carcateres'
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:'La dirección debe contar entre 3 y 30 carcateres'
    },
    provincia: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:'La dirección debe contar entre 3 y 30 carcateres'
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};
const mostrarMensajeDeError = (tipo, input) => {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipo, error);//sabemos el tipo de error
            console.log(input.validity[error]);//sabemos si ese error lo tiene o no
            console.log(mensajesDeError[tipo][error]);//el tipo nos devolvia undefines porque no estaba el data-tipo="nombre" en el input en el html. ahora nos devuelve el contenido del mensaje de error.
            mensaje = mensajesDeError[tipo][error];
        }
    });
    return mensaje
}

function validarNacimiento(input){
    const fecha = new Date(input.value);
    let mensaje = '';
    if(!mayorDeEdad(fecha)){
        mensaje = 'Debes tener al menos 18 años';
    }
    input.setCustomValidity(mensaje);//define el mensaje de validacion personalizado para el elemento seleccionado. Este nos aparecerá recien cuando intentemos enviar el formulario
}
function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
    );
    // console.log(fecha, " - ",fechaActual);
    // console.log(diferencia);
    return diferenciaFechas <= fechaActual;
}
