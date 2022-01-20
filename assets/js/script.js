import {instanciarAnimal, registrarAnimal,limpiarDatosFormulario} from './funciones.js'

// Comentario general: Estuve probando generar un codigo con más funciones para poder modularizar el codigo de mejor manera.
// "La primera regla de las funciones es que deben ser pequeñas. La segunda regla de las funciones es que deben ser más pequeñas que eso."

//Para activar el sonido de los animales en animales de investigacion hay que hacer click en el icono de sonido. 

// Aqui esta la IIFE que va a pedir el json
// Es una consulta asincronica que obtiene las imagenes y todos los datos de los animales
// Me parecio interesante hacer que se pida la base de datos de manera automatica al momento de cargar la pagina
const datos = (async ()=>{
    const response = await fetch('http://127.0.0.1:5500/animales.json')
    return response.json()
})()

// Se realiza una consulta asinc
const obtenerData = async(tipoAnimal)=>{
    const variable = await datos.then(json => {
        return json.animales.find(element => {
            if(element.name === tipoAnimal){
                return element
            }
        })
    })
    return variable
}


// Elementos del html

let preview = document.querySelector('#preview')
let animalesPlantilla = document.getElementById('Animales')
const ruedaAnimal = document.getElementById('animal')
const boton = document.getElementById('btnRegistrar')

// Variables que son usadas en los event listener
let data = null
let fuenteImagen = null
var animales = []


// Se agrega el EventListener para escuchar cuando se haga click en boton Agregar
boton.addEventListener('click', async (e)=>{
    e.preventDefault()
    const tipoAnimal = document.getElementById('animal').value
    const edadAnimal = document.getElementById('edad').value
    const comentarios = document.getElementById('comentarios').value

    // Verifico que todos los campos hayan sido llenados
    if(tipoAnimal && edadAnimal && comentarios){
    // Aqui va la promesa para obtener la imagen y el sonido
    data =  await obtenerData(tipoAnimal)
    const sonidoAnimal = await data.sonido
    const urlImagen = fuenteImagen.slice(5,-2)
    const urlSonido = `http://127.0.0.1:5500/assets/sounds/${sonidoAnimal}`
    const animal = instanciarAnimal(tipoAnimal, edadAnimal, urlImagen, comentarios, urlSonido)
    registrarAnimal(animal, animalesPlantilla, animales)
    limpiarDatosFormulario()
    }
    //En caso que falte uno manda una alerta
    else{
        alert('Por favor ingresa todos los datos!')
    }
})

// Se agrega el EventListener para escuchar cuando se selccione algo en la rueda y asi ir poniendo las imagenes del animal que corresponde
ruedaAnimal.addEventListener('change', async ()=>{
    const tipoAnimal = document.getElementById('animal').value
    data =  await obtenerData(tipoAnimal)
    const imgAnimal = await data.imagen
    const imgUrl = `http://127.0.0.1:5500/assets/imgs/${imgAnimal}`
    preview.style.backgroundImage =  `url(${imgUrl})`
    fuenteImagen = await preview.style.backgroundImage
})

// Esta linea está solo para verificar que el metodo Rugir y los demás funcionan.
//  Si uno lo descomenta, al abrirse la pagina el leon ruge así que funciona bien

// const leon = new Leon('leon','12','ddd','comentario','http://127.0.0.1:5500/assets/sounds/Rugido.mp3')
// leon.Rugir()

