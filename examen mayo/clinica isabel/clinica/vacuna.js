class vacunas{
    constructor(nombreVacuna,fecha){
        this._nombreVacuna = nombreVacuna;
        this._fecha = fecha;
    }

    get nombreVacuna() { 
        return this._nombreVacuna; 
    }

    set nombreVacuna(value) { 
        this._nombreVacuna = value; 
    }

    get fecha() { 
        return this._fecha; 
    }

    set fecha(value) { 
        this._fecha = value; 
    }

    verVacuna(){
        return this._nombreVacuna + " - " + this._fecha;
    }
}