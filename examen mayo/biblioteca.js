function Biblioteca(nombre) {
    this.nombre = nombre;
    this.ejemplares = [];
    this.publicaciones = [];
    this.lectores = [];
    this.prestamos = [];

    // Actualización objetos

    this.nuevaPublicacion = function(isbn, titulo) {
        let nuevaPublicacion = new Publicacion(isbn, titulo);
        this.publicaciones.push(nuevaPublicacion);
        console.log(`Publicación ${isbn} - ${titulo} añadida a la colección`);
        return nuevaPublicacion;
    }

    this.nuevoEjemplar = (signatura, publicacion, ubicacion) => {
        let nuevoEjemplar = new Ejemplar(signatura, publicacion, ubicacion);
        this.ejemplares.push(nuevoEjemplar);
        console.log(`Ejemplar ${signatura} - ${publicacion.titulo} añadido a la colección`);
        return nuevoEjemplar;
    }

    this.nuevoLector = (dni, nombre) =>  { 
        let nuevoLector = new Lector(dni,nombre);
        this.lectores.push(nuevoLector);
        console.log(`Lector ${nombre} registrado en la biblioteca`);
        return nuevoLector;
    };

    // Operaciones de préstamo

    this.nuevoPrestamo = (ejemplar, lector) =>{
        if (ejemplar.disponible) {
            let nuevoPrestamo = new Prestamo(ejemplar, lector);
            this.prestamos.push(nuevoPrestamo);
            console.log(`Préstamo registrado para el ejemplar ${ejemplar.signatura} - ${ejemplar.publicacion.titulo} y lector ${lector.nombre}`);
            return nuevoPrestamo;
        }
        else {
            console.error(`Lo siento, la publicación ${titulo} no está disponible`);
            return null;
        }
    } 

    this.procesaPrestamo = (titulo, lector) => {
        // buscamos el primer ejemplar disponible para el titulo solicitado por el lector
        let ejemplar = this.ejemplares.find(ejemplar => ejemplar.publicacion.titulo === titulo && ejemplar.disponible);
        
        if (ejemplar === undefined) { // No hay ninguno disponible
            console.error(`Lo siento, la publicación ${titulo} no está disponible`);
            return null;
        } else
        {
            nuevoPrestamo = this.nuevoPrestamo(ejemplar,lector);
            console.log(`Se ha procesado el préstamo del ${titulo} con la signatura ${ejemplar.signatura} en el día ${nuevoPrestamo.fechaInicio}` );
            return this.nuevoPrestamo;     
        } 
    };

    this.devuelvePrestamo = (signatura) => {
        let prestamo = this.prestamos.find(prestamo => prestamo.ejemplar.signatura === signatura && !prestamo.ejemplar.disponible);
        if (prestamo === undefined) {
            console.error(`Esa signatura:${signatura} no tiene ningún préstamo activo`);
        } else {
            prestamo.fechaFinal = new Date();
            prestamo.ejemplar.disponible = true;
            console.log(`Se ha devuelto el préstamo del ${prestamo.ejemplar.publicacion.titulo} con la signatura ${signatura} en el día ${prestamo.fechaFinal}`);
        }
    }
 
    // Consultas
            
    this.ejemplaresTitulo = (titulo) => this.ejemplares.filter(ejemplar => ejemplar.publicacion.titulo === titulo);
    this.ejemplaresDisponiblesTitulo = (titulo) => this.ejemplares.filter(ejemplar => ejemplar.publicacion.titulo === titulo && ejemplar.disponible);
    this.seleccionarEjemplar = (signatura) => this.ejemplares.find(ejemplar => ejemplar.signatura === signatura);

    // Listados

    this.listarEjemplares = (coleccion = this.ejemplares) => coleccion.forEach(ejemplar => 
             console.log(ejemplar.signatura, ejemplar.publicacion.titulo, ejemplar.disponible, ejemplar.ubicacion)             
      )

    this.listarLectores = () => (console.table(this.lectores));

    this.listarPrestamos = (ejemplar) => {
        let prestamosEjemplar = this.prestamos.filter(prestamo => prestamo.ejemplar.signatura === ejemplar.signatura);
        let salidaPrestamos = [];        
        prestamosEjemplar.forEach(prestamo => salidaPrestamos.push( {
            signatura: prestamo.ejemplar.signatura,
            titulo: prestamo.ejemplar.publicacion.titulo,
            lector: prestamo.lector.dni + " " + prestamo.lector.nombre,
            'fecha inicio': prestamo.fechaInicio,
            'fecha final': prestamo.fechaFinal,
            }
        ))
                                                                           
        console.table(salidaPrestamos);
    }

}

function Lector(dni, nombre) {
    this.dni = dni;
    this.nombre = nombre;
    this.fechaAlta = new Date();

}


function Autor(numero, nombre) {
    this.numero = numero;
    this.nombre = nombre;
    console.log(`Autor ${numero} - ${nombre} creado`)
}

function Publicacion(isbn, titulo , autores = []) {
    this.titulo = titulo;
    this.isbn = isbn;
    this.autores = autores;
    this.nuevoAutor = (numero, nombre) => {
        let autor = new Autor(numero, nombre); 
        this.autores.push(autor);
        console.log(`Autor ${numero} - ${nombre} asignado a la publicación ${titulo}`);
        return autor;
    }
    console.log(`Publicación ${isbn} - ${titulo} creada`)
}

function Ejemplar(signatura, publicacion, ubicacion) {
    this.signatura = signatura;
    this.publicacion = publicacion;
    this.ubicacion = ubicacion;
    this.disponible = true;
    this.ficha = () =>  {
        console.log("Signatura: ", this.signatura);
        console.log("Título: ", this.publicacion.titulo );
        console.log("Ubicación: ", this.ubicacion);
        console.log("Disponible: ", this.disponible ? 'Sí' : 'No');
    }
    
}

function Prestamo(ejemplar, lector) {
    this.ejemplar = ejemplar;
    this.lector = lector;
    this.fechaInicio = new Date();
    this.fechaFinal = '';
    this.ejemplar.disponible = false;
}

const biblioGijon = new Biblioteca("Gijón");

let publicacion = biblioGijon.nuevaPublicacion('0131103628','The C Programming Language');

publicacion.nuevoAutor(1, 'Brian W. Kernighan');
publicacion.nuevoAutor(2, 'Dennis M. Ritchie');

biblioGijon.nuevoEjemplar("C/12", publicacion, "b12-n");
biblioGijon.nuevoEjemplar("C/13", publicacion, "b13-n");
biblioGijon.nuevoEjemplar("C/14", publicacion, "b14-n");
biblioGijon.nuevoEjemplar("C/15", publicacion, "b15-n");

publicacion = biblioGijon.nuevaPublicacion('97818479411007', 'Scrum: The Art of Doing Twice the Work in Half the Time', ['Jeff Shuterland']);

biblioGijon.nuevoEjemplar("A/08", publicacion, "a08-x");
biblioGijon.nuevoEjemplar("C/09", publicacion, "a09-z");

biblioGijon.listarEjemplares();
biblioGijon.listarEjemplares(biblioGijon.ejemplaresDisponiblesTitulo('The C Programming Language'));

let ejemplar = biblioGijon.seleccionarEjemplar('C/12');

ejemplar.ficha();

const maria = biblioGijon.nuevoLector("aaaaaaaaa", 'María Garrido');
const pedro = biblioGijon.nuevoLector("bbbbbbbbb", 'Pedro Pérez');
const juan = biblioGijon.nuevoLector("ccccccccc", 'Juan Gómez');
const luisa = biblioGijon.nuevoLector("dddddddd", 'Luisa Fernández');

biblioGijon.listarLectores();

biblioGijon.procesaPrestamo('The C Programming Language', maria);

biblioGijon.listarPrestamos(ejemplar);

biblioGijon.listarEjemplares();

biblioGijon.procesaPrestamo('The C Programming Language', juan);
biblioGijon.procesaPrestamo('Scrum: The Art of Doing Twice the Work in Half the Time', juan);
biblioGijon.procesaPrestamo('Scrum: The Art of Doing Twice the Work in Half the Time', luisa);
biblioGijon.procesaPrestamo('Scrum: The Art of Doing Twice the Work in Half the Time', pedro);
biblioGijon.procesaPrestamo('The C Programming Language', pedro);


biblioGijon.devuelvePrestamo('C/14');
biblioGijon.devuelvePrestamo('C/15');
biblioGijon.devuelvePrestamo('C');





