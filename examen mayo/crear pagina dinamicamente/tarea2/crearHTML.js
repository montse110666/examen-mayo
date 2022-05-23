const elementoACrear = {
  posicion: "afterbegin", // insertAdjacentElement(posicion, body)
  tag: "div", // document.createElement(tag)
  contenido: "probando eventos", // elementoCreado.innerHTML = contenido...
  atributos: {
  // para cada atributo (for atr in obj)
    class: "prueba", // elementoCreado.setAttribute(...)
  },
  estilos: {
          display: "flex",
          margin: ".5rem",
          padding: "1rem",
          border: "3px solid black",
          minHeight: "1rem",
          flexGrow: "1",
        },
eventos: [
  // para cada evento.
  {
    // elementoCreado.addEventListener()
    evento: "click",
    funcion: informacion,
  },
  {
    evento: "mouseover",
    funcion: informacion,
  },
  ],
};
function informacion(evento) {
  console.log("Tipo de evento: ", evento.type);
  console.log("Target: ", evento.target);
  console.log("CurrentTarget - elemento que escucha", evento.currentTarget);
}

function crearHtml(elementoACrear){
  let nuevoelemento=document.createElement(elementoACrear.tag);
  let objeto=elementoACrear.atributos;
  for (const atributo in objeto) {
    nuevoelemento.setAttribute(atributo,objeto[atributo]);
    }

  objeto=elementoACrear.eventos;
  objeto.forEach(element => {
      nuevoelemento.addEventListener(element.evento, element.funcion,true);
  });
  
  cuerpo.insertAdjacentElement(elementoACrear.posicion,nuevoelemento);
  nuevoelemento.insertAdjacentHTML('beforeend',elementoACrear.contenido);
  
  }
  
document.head=document.createElement('head');
let cabecera=document.firstElementChild.children[0];
document.body=document.createElement('body');
let cuerpo=document.firstElementChild.children[1]; 
crearHtml(elementoACrear);

let estilo = document.createElement("style");
document.getElementsByTagName('head')[0].appendChild(estilo);
let estiloDiv=elementoACrear.tag+"{";
let lineaEstilo=elementoACrear.estilos;
for (const atributo in lineaEstilo) {
  estiloDiv+=atributo+":"+lineaEstilo[atributo]+";";
}
estiloDiv+="}";
estilo.insertAdjacentHTML('beforeend',estiloDiv);