import {Animal} from './animal.js'

class Leon extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido)
    }

    Rugir(){
        const audio = new Audio(`${this.Sonido()}`)
        audio.play()
    }   
}

class Lobo extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido)
    }

    Aullar(){
        const audio = new Audio(`${this.Sonido()}`)
        audio.play()
    }
}

class Oso extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido)
    }
    Gruñir(){
        const audio = new Audio(`${this.Sonido()}`)
        audio.play()
    }
}

class Serpiente extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido)
    }
    Sisear(){
        const audio = new Audio(`${this.Sonido()}`)
        audio.play()
    }
}

class Aguila extends Animal{
    constructor(nombre, edad, img, comentarios, sonido){
        super(nombre, edad, img, comentarios, sonido)
    }
    Chillar(){
        const audio = new Audio(`${this.Sonido()}`)
        audio.play()
    }
}

export {Leon, Lobo, Oso, Serpiente, Aguila}