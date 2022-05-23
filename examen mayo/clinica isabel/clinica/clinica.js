class clinica{
    constructor (nombreClinica){
        this._nombreClinica = nombreClinica;
        this._mascotas = [];
    }

    get nombreClinica() { 
        return this._nombreClinica; 
    }

    set nombreClinica(value) { 
        this._nombreClinica = value; 
    }

    altaMascotas(){
        var nombre = prompt("Introduce nombre mascota");
        var edad = prompt("Introduce la edad de la mascota");
        var dueño = prompt("Introduce el nombre del dueño");

        var nuevaMascota = new mascota(nombre,edad,dueño);
        this._mascotas.push(nuevaMascota);
    }

    mostrarMascotas(){
        this._mascotas.forEach((mascota) => {
            console.log(mascota.verMascota());
        });
    }

    buscarMascota(nombreMascota) {
        return this._mascotas.find(mascota => mascota.nombreMascota === nombreMascota);
    }

}