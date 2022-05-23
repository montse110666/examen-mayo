/*

Herencia

Permite extender las propiedades y métodos de una clase a otra
heredada.

*/

// Partimos de una Clase general

class Persona {

    constructor(nombre, fechaNacimiento) {
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(valor) {
        this._nombre = valor;
    }

    get fechaNacimiento() {
        return this._fechaNacimiento;
    }

    set fechaNacimiento(valor) {
        this._fechaNacimiento = valor;
    }

    get edad() { // propiedad calculada por getter
        let edad = Math.floor((Date.now() - this.fechaNacimiento)/ 31556926000);
        return edad;
    }

    mostrarTodo() { // iteramos sobre todas sus propiedades (los métodos
                    // en el caso de las clases no son enumerables y por
                    // lo tanto no aparecen en el bucle. )
        for (let elem in this) {
            console.log(elem, " => ",this[elem]);
        }
    }
}

let lucas = new Persona("Lucas Gonzalez", new Date(1965,11,25));

console.log(lucas.nombre, ": ", lucas.edad, " años"); // utilizando getter, no la utilizamos como un método

// Creamos una clase nueva que extiende la anterior
// 
// La clase 'Empleado' extiende la clase 'Persona' añadiendo propiedades y métodos
// propios de la clase.
//

class Empleado extends Persona {
    
    static categorias = ['A','B','C','D']; // propiedad estática, sólo accesible desde la clase

    constructor(nombre, fechaNacimiento, categoriaProfesional) {
        super(nombre, fechaNacimiento); // Llamada al constructor de la clase superior
        this.categoriaProfesional = categoriaProfesional; // propiedad específica de la clase
        this._vacacionesPendientes = 24; 
    }
    get categoriaProfesional() {
        return this._categoriaProfesional;
    }
    set categoriaProfesional(valor) {
        if(Empleado.categorias.indexOf(valor) != -1) { // Utilización de la propiedad estática
            this._categoriaProfesional = valor;
        }
    }
    get vacacionesPendientes() {
        return this._vacacionesPendientes;
    }

    tomarDiasVacaciones(dias) {
        if (dias <= this.vacacionesPendientes) {
            this.vacacionesPendientes -= dias;
            return this.vacacionesPendientes;
        }
        return -1; // error no quedan días suficientes.
    }

    reestablecerDiasVacaciones() {
        this.vacacionesPendientes = 24;
    }
    
    static compararCategorias(empleadoA, empleadoB) { // método estático (utilizable a nivel de clase)
        if (empleadoA.categoriaProfesional > empleadoB.categoriaProfesional) {
            return 1;
        }
        if (empleadoA.categoriaProfesional < empleadoB.categoriaProfesional) {
            return -1;
        }
        return 0;
    }
}

const juan = new Empleado('Juan Pérez', new Date(1965,11,25), 'A');

juan.categoriaProfesional = 'J'; // categoría no válida por lo que no se mueve

juan.mostrarTodo();

const plantilla = [
    juan,
    new Empleado('Lucía López', new Date(1987,10,22), 'B'),
    new Empleado('Santiago Segura', new Date(1992,6,12), 'D'),
    new Empleado('Noelia Rodríguez', new Date(1997,0,7), 'A'),
    new Empleado('Felipe Sánchez', new Date(2005,2,20), 'A'),
    new Empleado('Elena López', new Date(2000,11,10), 'B'),
    new Empleado('Nuria García', new Date(1999,8,26), 'C'),
    new Empleado('Leonor Pantaleón', new Date(1986,11,10), 'C'),
    new Empleado('Alberto Martín', new Date(1980,6,10), 'B'),
    new Empleado('Sara Soto', new Date(2001,3,14), 'D')
]

plantilla.sort(Empleado.compararCategorias); // Utilizando un método estático para realizar el ordenamiento
                                             // Ver el método Array.sort()
                                             
juan.tomarDiasVacaciones(4); // Juan toma 4 días de vacaciones

console.log(juan.vacacionesPendientes); 





