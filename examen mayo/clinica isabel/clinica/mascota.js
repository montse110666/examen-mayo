class mascota{
    constructor(nombreMascota,edad,dueño){
        this._nombreMascota = nombreMascota;
        this._edad = edad;
        this._dueño = dueño;
        this._vacunas = [];
    }

    get nombreMascota() { 
        return this._nombreMascota; 
    }

    set nombreMascota(value) { 
        this._nombreMascota = value; 
    }

    get edad() { 
        return this._edad; 
    }

    set edad(value) { 
        this._edad = value; 
    }

    get dueño() { 
        return this._dueño; 
    }

    set dueño(value) { 
        this._dueño = value; 
    }

    verMascota(){
        return this._nombreMascota + " - " + this._edad + " - " + this._dueño;
    }

    ponerVacuna(nombre, fecha){
        this._vacunas.push(new vacunas(nombre,fecha));
    }
}