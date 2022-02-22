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

// Esta funcion se encarga de registrar al animal
const registrarAnimal = (animal, animalesPlantilla,animales) => {
    animales.push(animal) 
    mostrarAnimales(animales, animalesPlantilla)
}

// Esta funcion muestra los animales en la seccion "Animales en Investigacion"
// Recibe como argumento un arreglo animales con todos los animales y la plantilla donde crear los animales
const mostrarAnimales = (animales, animalesPlantilla) => {
    // Recorre el arreglo animales, primero limpia el html y luego escribe 
    // Agrega la informacion necesaria a la img del animal en forma de data
    // y agrega el sonido como data en el boton del sonido para poder accederlos mas tarde
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
    let imagenesAnimales = document.querySelectorAll('#Animales img')
    const modal = document.querySelector('.modal-body')

    imagenesAnimales.forEach((imagenAnimal) => {
        // Se agrega el eventListener que escucha el click en la imagen del animal y muestra los datos correspondientes que se encuentran almacenados como data en la misma imagen
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
        sonidoAnimal.addEventListener('click',()=>{
            // Creo el audio inicializando la clase Audio y paso como parametro la url del boton. 
            const audio = new Audio(`${sonidoAnimal.dataset.sonido}`)
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
    formImage.style.backgroundImage = 'url(./assets//imgs/lion.svg)'
}

export {instanciarAnimal, registrarAnimal,limpiarDatosFormulario}