var miClinica = new clinica("misAmigos");

function menu(){
    let mensaje = "1.- Alta de mascota.\n";
    mensaje += "2.- Vacunar mascota.\n";
    mensaje += "3.- Baja de mascota.\n";
    mensaje += "4.- Salir.\n";
    mensaje += "Elija una opcion";
    return mensaje;
}

function vacunar(){
    let nombre = prompt("Nombre de la mascota a vacunar");
    let miMascota = miClinica.buscarMascota(nombre);
    if(miMascota!=null){
        let nombreVacuna = prompt("Introduce el nombre de la vacuna");
        let fechaVacuna = prompt("Introcuce la fecha de la vacuna");
        miMascota.ponerVacuna(nombreVacuna,fechaVacuna);
    }else{
        document.write("no existe alguna mascota con ese nombre");
    }
}

do{
    opcion = parseInt(prompt(menu()));

    switch(opcion){
        case 1: miClinica.altaMascotas();
                break;
        case 2: miClinica.mostrarMascotas();
                vacunar();
                break;
        case 3: 
                break;
        case 4: document.write("Gracias por usar el programa");
    }
}while(opcion!=4);

//document.write(miClinica.buscarMascota("Coco"));

//document.write(miClinica.buscarMascota("Coco").verMascota());

