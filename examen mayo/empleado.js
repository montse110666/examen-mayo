/*

Herencia

Permite extender las propiedades y métodos de una clase a otra
heredada.

*/

// Partimos de una Clase general

class Persona {

    constructor(nombre, fechaNacimiento) {
        this._nombre = nombre;
        this._fechaNacimiento = fechaNacimiento;
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

    static comparaEdad = (persona1, persona2) => persona1.edad - persona2.edad;

    mostrarTodo() { // iteramos sobre todas sus propiedades (los métodos
                    // en el caso de las clases no son enumerables y por
                    // lo tanto no aparecen en el bucle. )
        for (let elem in this) {
            console.log(elem, " => ",this[elem]);
        }
    }
}

let lucas = new Persona("Lucas Gonzalez", new Date(1965,11,25));
let maria = new Persona("Maria Perez", new Date(1992,6,10));


console.log(Persona.comparaEdad(lucas, maria));



console.log(lucas.nombre, ": ", lucas.edad, " años"); // utilizando getter, no la utilizamos como un método

// Creamos una clase nueva que extiende la anterior
// 
// La clase 'Empleado' extiende la clase 'Persona' añadiendo propiedades y métodos
// propios de la clase.
//

class Empleado extends Persona {
    
    static categorias = ['A','B','C','D']; // propiedad estática, sólo accesible desde la clase

    constructor(codigo, nombre, fechaNacimiento, fechaIncorporacion = new Date(), salario, categoria) {
        super(nombre, fechaNacimiento); // Llamada al constructor de la clase superior
        this._codigo = codigo;
        this._fechaIncorporacion = fechaIncorporacion;
        this._salario = salario;
        this._categoriaProfesional = categoria; 
        this._vacacionesPendientes = 24;
        this._fechaBaja = null;
        this._historial = [
            {
                operacion: 'alta',
                fecha: fechaIncorporacion,
                categoriaProfesional : categoria,
                salario: salario
            }]
    }

    get codigo() {
        return this._codigo;
    }
    
    get salario() {
        return this._salario;
    }
    
    get categoriaProfesional() {
        return this._categoriaProfesional;
    }

    get fechaIncorporacion() {
        return this._fechaIncorporacion;
    }

    get activo() {
        return this._fechaBaja === null;
    }

    // Eliminamos este set, para tratar la categoríaProfesional desde las operaciones de negocio. 
    //
    // set categoriaProfesional(valor) {
    //    if(Empleado.categorias.indexOf(valor) != -1) { // Utilización de la propiedad estática
    //        this._categoriaProfesional = valor;
    //    }
    // }

    get vacacionesPendientes() {
        return this._vacacionesPendientes;
    }

    tomarDiasVacaciones(dias) {
        if (dias <= this.vacacionesPendientes) {
            this._vacacionesPendientes -= dias;
            return this.vacacionesPendientes;
        }
        return -1; // error no quedan días suficientes.
    }

    reestablecerDiasVacaciones() {
        this.vacacionesPendientes = 24;
    }

    nuevaPromocion(categoria, salario, fecha = new Date()) {
        
        let registroHistorial = {
                                    operacion: 'promoción',
                                    fecha: fecha,
                                    categoriaProfesional: this._categoriaProfesional, //invariable
                                    salario: this._salario // invariable
                                };
        let cambioCategoria = false; // Booleano para controlar el cambio categoría
        let cambioSalario = false;   // Booleano para controlar el cambio de salario
        
        // Validamos si vamos a cambiar la categoría

        let idxNuevaCategoria = Empleado.categorias.indexOf(categoria); // Índice de la categoría a cambiar.

        if (idxNuevaCategoria != -1) { // La categoría existe.
            if (Empleado.categorias[idxNuevaCategoria -1] === this.categoriaProfesional) { // Sólo hay un salto de categoría
                // Cambiamos la categoría
                registroHistorial['categoriaProfesional'] = categoria;
                // registroHistorial.categoriaProfesional = categoria;
                this._categoriaProfesional = categoria;
                cambioCategoria = true;
            }
        }
        if (salario > this.salario) {
            // registroHistorial['salario'] = salario;
            registroHistorial.salario = salario;
            this._salario = salario;
            cambioSalario = true;
        }

        if (cambioCategoria || cambioSalario) {
            this._historial.push(registroHistorial);
        } else {
            registroHistorial = null;
        }
        return registroHistorial;
    }

    estadoHistorialFecha(fecha) {
        let estado = this._historial.find( (elementoHistorial, indice, hist) => fecha >= elementoHistorial.fecha && ((indice < hist.length-1) ? fecha < hist[indice+1].fecha : true));
        return {
                fechaEstado : fecha,
                estadoHistorial : estado
        }
    }
    
    situacion(fecha){
        for(let i=((this._historial).length)-1; i>=0; i--){
            if(fecha>this._historial[i].date){
                return {
                    fechaEstado : fecha,
                    estadoHistorial :this._historial[i]
                }
            }
        }
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


class Empresa {
    constructor(cif, nombre, direccion)  {
        this._cif = cif;
        this._nombre = nombre;
        this._direccion = direccion;
        this._plantilla = [];
    }

    set cif(valor) {
        this._cif = valor;
    }

    get cif() {
        return this._cif;
    }

    set nombre(valor) {
        this._nombre = valor;
    }

    get nombre() {
        return this._nombre;
    }

    set direccion(valor) {
        this._direccion = valor;
    }

    get direccion() {
        return this._direccion;
    }
    
    nuevoEmpleado(codigo, nombre, fechaNacimiento, fechaIncorporacion = new Date(), salario, categoria) {
        let miEmpleadoNuevo = new Empleado(codigo, nombre, fechaNacimiento, fechaIncorporacion , salario, categoria);
        this._plantilla.push(miEmpleadoNuevo);
    }

    // nuevoEmpleado(empleado) {
    //     this.plantilla.push(empleado);
    // }

    dameEmpleado(codigo) {
        return this._plantilla.find(empleado => empleado.codigo === codigo);
    }

}




const miEmpresa = new Empresa("A33000000","EstamosAprendiendoJS","Aquí mismo");

miEmpresa.nombre = "pepe";

miEmpresa.cif ="XXXXX";



miEmpresa.nuevoEmpleado('A033','Ander da Silva',new Date(2002,7,7),new Date(2022,0,24),16000,'A');


miEmpresa._plantilla  = [
    new Empleado('A033','Ander da Silva',new Date(2002,7,7),new Date(2022,0,24),16000,'A'),
    new Empleado('A047','Casilda Alarcos González',new Date(2003,8,1),new Date(2022,1,9),16000,'A'),
    new Empleado('A034','Cristina Torralba Goñi',new Date(2000,11,5),new Date(2022,0,24),16000,'A'),
    new Empleado('A028','Elena Alonso Alonso',new Date(2000,1,5),new Date(2022,0,19),16000,'A'),
    new Empleado('A036','Estefanía Cerdán Suárez',new Date(2000,0,27),new Date(2022,0,24),16000,'A'),
    new Empleado('A009','Evelina Santiago Miras',new Date(2001,5,6),new Date(2021,5,29),16000,'A'),
    new Empleado('A043','Felipa Cachón Chacón',new Date(2002,7,8),new Date(2022,1,9),16000,'A'),
    new Empleado('A029','Fermín López Amigo',new Date(2003,8,2),new Date(2022,0,21),16000,'A'),
    new Empleado('A010','Fernando Marrón Fins',new Date(2000,11,6),new Date(2021,5,29),16000,'A'),
    new Empleado('A012','Genaro Zanco Suárez',new Date(2000,1,6),new Date(2021,6,14),16000,'A'),
    new Empleado('A038','Gustavo Lucena Martín',new Date(2001,5,7),new Date(2022,0,30),16000,'A'),
    new Empleado('A013','Ignacio Corral Corral',new Date(1998,9,13),new Date(2021,6,14),16000,'A'),
    new Empleado('A045','Justa Amado Morales',new Date(2001,5,15),new Date(2022,1,9),16000,'A'),
    new Empleado('A015','Kevin Smith',new Date(1999,11,22),new Date(2021,7,24),16000,'A'),
    new Empleado('A041','Marc Ander Andrade',new Date(1998,10,5),new Date(2022,0,30),16000,'A'),
    new Empleado('A040','Maria Josefa Ariza García',new Date(2000,4,5),new Date(2022,0,30),16000,'A'),
    new Empleado('A004','Martín Gámez Suero',new Date(2000,3,30),new Date(2021,2,30),16000,'A'),
    new Empleado('A003','Mireia Solsona Terreros',new Date(2002,7,27),new Date(2021,1,14),16000,'A'),
    new Empleado('A039','Moisés Heredia Sonpar',new Date(1997,2,5),new Date(2022,0,30),16000,'A'),
    new Empleado('A021','Saúl Corre Más',new Date(1998,9,9),new Date(2021,9,30),16000,'A'),
    new Empleado('A037','Tania Lloret Sonsol',new Date(1998,8,20),new Date(2022,0,24),16000,'A'),
    new Empleado('A011','Thiago Sintra Sintra',new Date(2004,4,15),new Date(2021,6,14),16000,'A'),
    new Empleado('A022','Tomás Porras Puerta',new Date(2001,11,28),new Date(2021,10,14),16000,'A'),
    new Empleado('A046','Violeta Ahmed',new Date(2002,7,34),new Date(2022,1,9),16000,'A'),
    new Empleado('A044','Yanira Domínguez Campoy',new Date(2002,7,35),new Date(2022,1,9),16000,'A'),
    new Empleado('A042','Yassine Paez Polito',new Date(2000,1,1),new Date(2022,1,9),16000,'A'),
    new Empleado('A023','Ana Marín Morán',new Date(1995,6,6),new Date(2021,10,29),18500,'B'),
    new Empleado('A006','Carolina Domínguez Domínguez',new Date(1994,4,8),new Date(2021,2,30),21500,'B'),
    new Empleado('A031','Gerardo Serra Clemente',new Date(1993,7,8),new Date(2022,0,24),19000,'B'),
    new Empleado('A016','Laura Postergado Plinto',new Date(1990,10,10),new Date(2021,7,24),23000,'B'),
    new Empleado('A007','Lucía Álvarez Álvarez',new Date(1989,1,5),new Date(2021,2,30),18700,'B'),
    new Empleado('A017','María Rosa Sinpar Parece',new Date(1982,0,31),new Date(2021,8,14),21250,'B'),
    new Empleado('A025','Noemí García García',new Date(1990,7,17),new Date(2021,11,8),23000,'B'),
    new Empleado('A018','Omar Terreros Marinos',new Date(1985,5,9),new Date(2021,8,19),19000,'B'),
    new Empleado('A005','Sebastián Coto Cotelo',new Date(1984,3,3),new Date(2021,2,30),20000,'B'),
    new Empleado('A024','Umer Mers Sian',new Date(1982,2,24),new Date(2021,11,8),22500,'B'),
    new Empleado('A032','Vanessa Domingo Nieves',new Date(1981,11,15),new Date(2022,0,24),19000,'B'),
    new Empleado('A026','África Martín Martín',new Date(1979,2,23),new Date(2022,0,14),25700,'C'),
    new Empleado('A008','Domingo Bono Cinco',new Date(1975,4,18),new Date(2021,5,8),23000,'C'),
    new Empleado('A002','Javier González Suárez',new Date(1974,3,21),new Date(2021,1,14),23000,'C'),
    new Empleado('A014','Juan Jonil Juanco',new Date(1985,1,25),new Date(2021,7,24),24000,'C'),
    new Empleado('A027','Miguel Fernández Morán',new Date(1980,4,25),new Date(2022,0,14),25500,'C'),
    new Empleado('A019','Paloma Cerco Del Monte',new Date(1985,6,7),new Date(2021,9,14),25000,'C'),
    new Empleado('A020','Raúl Lomas Lomas',new Date(1985,11,11),new Date(2021,9,14),24500,'C'),
    new Empleado('A030','Susana Tomás Martínez',new Date(1971,0,24),new Date(2022,0,24),24800,'C'),
    new Empleado('A035','Abraham Benevente García',new Date(1969,5,4),new Date(2022,0,24),28000,'D'),
    new Empleado('A001','María Rodríguez Pérez',new Date(1972,11,7),new Date(2021,0,0),30000,'D')
]


let empleado1 = miEmpresa.dameEmpleado('A013');

empleado1.nuevaPromocion('B', 17500, new Date(2021,9,19));

console.log(empleado1.estadoHistorialFecha(new Date(2019,6,30)));
console.log(empleado1.estadoHistorialFecha(new Date(2020,6,30)));
console.log(empleado1.estadoHistorialFecha(new Date(2021,6,30)));
console.log(empleado1.estadoHistorialFecha(new Date(2022,6,30)));

console.log(empleado1.situacion(new Date(2022,6,30)));

miEmpresa._plantilla.sort(Persona.comparaEdad);

console.log(miEmpresa._plantilla);


