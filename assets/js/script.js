import {Animal} from './animal.js'
import { Oso, Lobo, Leon, Serpiente, Aguila } from './tipos-animales.js'


// Esta funcion instancia el animal dependiendo del tipo
const instanciarAnimal =(tipoAnimal,edadAnimal,img,comentarios, sonido) =>{
    // Switch para instanciar el animal que corresponda (ahora si que no se me va a olvidar hacerlo ¯\_(ツ)_/¯)
    switch(tipoAnimal){
        case 'Leon':
            const leon = new Leon(tipoAnimal,edadAnimal,img,comentarios, sonido)
            return leon
        case 'Lobo':
            const lobo = new Lobo(tipoAnimal,edadAnimal,img,comentarios,sonido)
            return lobo   
        case 'Oso':
            const oso = new Oso(tipoAnimal,edadAnimal,img,comentarios,sonido)
            return oso
        case 'Serpiente':
            const serpiente = new Serpiente(tipoAnimal,edadAnimal,img,comentarios,sonido)
            return serpiente 
        case 'Aguila':
            const aguila = new Aguila(tipoAnimal,edadAnimal,img,comentarios,sonido)
            return aguila                            
    }
}

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

const modal = document.querySelector('.modal-body')

const registrarAnimal = (animal) => {
    animales.push(animal) 
    mostrarAnimales(animales, animalesPlantilla)
}


// Esta funcion muestra los animales en la seccion "Animales en Investigacion"
// Recibe como argumento un arreglo animales con todos los animales y la plantilla donde crear los animales
const mostrarAnimales = (animales, animalesPlantilla) => {
    // Recorre el arreglo animales y primero limpia el html y luego escribe 
    animales.forEach(() => {
        animalesPlantilla.innerHTML = ''
        animales.forEach( (animal)=>{
            animalesPlantilla.innerHTML += `
            <div class="col-4">
            <div class="card" style="">
            <img src="${animal.Img()}" class="card-img-top" a
                data-comentarios = "${animal.Comentarios()}"
                data-edad = "${animal.Edad()}"
                data-toggle="modal" 
                data-target="#exampleModal"
            >
            <div class="bg-secondary" id="botonSonido">
            <img src="./assets/imgs/audio.svg" style="width:17.5% ; padding:5px ; margin:0"
            data-sonido= "${animal.Sonido()}"
            >
            </div>
            </div>
            </div>
            `
        })
    })
    
    imagenesAnimales = document.querySelectorAll('#Animales img')
    imagenesAnimales.forEach((imagenAnimal) => {
        imagenAnimal.addEventListener('click',()=>{
            modal.innerHTML= `
            <img src="${imagenAnimal.src}" class="card-img-top mb-3">
            <h5 class= "text-center text-light">${imagenAnimal.dataset.edad}</h5>
            <h5 class= "text-center text-light">Comentarios</h5>
            <p class= "text-center text-light">${imagenAnimal.dataset.comentarios}</p>`
        })
    })
    const sonidoAnimales = document.querySelectorAll('#botonSonido img')
    sonidoAnimales.forEach((sonidoAnimal) => {
        console.log(sonidoAnimal.dataset.sonido);
        sonidoAnimal.addEventListener('click',()=>{
            const audio = new Audio(`${sonidoAnimal.dataset.sonido}`)
            console.log(audio);
            audio.play()
        })
        
    })
}

// Esta funcion limpia los datos del formulario
const limpiarDatosFormulario = () => {
    // Obtemeos los elementos del formulario y seteamos sus valores a los iniciales
    const formDropdown = document.querySelectorAll('.form-group select')
    formDropdown.forEach((dropdown)=> dropdown.selectedIndex = '0' )
    const formText= document.querySelector('.form-group textarea')
    formText.value = '' 
    const formImage = document.getElementById('preview')
    formImage.style.backgroundImage = 'url(http://127.0.0.1:5500/assets//imgs/lion.svg)'
}
let animales = []
let preview = document.querySelector('#preview')
let animalesPlantilla = document.getElementById('Animales')

let imagenesAnimales = null

let data = null
let fuenteImagen = null

const ruedaAnimal = document.getElementById('animal')

const boton = document.getElementById('btnRegistrar')

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
    registrarAnimal(animal)
    limpiarDatosFormulario()
    }
    //En caso que falte uno manda una alerta
    else{
        alert('Por favor ingresa todos los datos!')
    }
})



// Se agrega el EventListener para escuchar cuando se cambie los cambios de la rueda y así ir poniendo las imagenes del animal que corresponde
ruedaAnimal.addEventListener('change', async ()=>{
    const tipoAnimal = document.getElementById('animal').value
    data =  await obtenerData(tipoAnimal)
    const imgAnimal = await data.imagen
    const imgUrl = `http://127.0.0.1:5500/assets/imgs/${imgAnimal}`
    preview.style.backgroundImage =  `url(${imgUrl})`
    fuenteImagen = await preview.style.backgroundImage
})



// Esta linea está solo para verificar que el metodo Rugir y los demás funcionan

// const leon = new Leon('leon','12','ddd','comentario','http://127.0.0.1:5500/assets/sounds/Rugido.mp3')
// leon.Rugir()

