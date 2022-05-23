nieto1={clase:"class", nombreclas:"nieto", id:"id", nombreid:"h0101"};
nieto2={clase:"class", nombreclas:"nieto", id:"id", nombreid:"h0102"};
nieto3={clase:"class", nombreclas:"nieto", id:"id", nombreid:"h0103"};
nieto4={clase:"class", nombreclas:"nieto", id:"id", nombreid:"h0201"};
nieto5={clase:"class", nombreclas:"nieto", id:"id", nombreid:"h0202"};
nieto6={clase:"class", nombreclas:"nieto", id:"id", nombreid:"h0203"};
nieto7={clase:"class", nombreclas:"nieto", id:"id", nombreid:"h0301"};
nieto8={clase:"class", nombreclas:"nieto", id:"id", nombreid:"h0302"};
nieto9={clase:"class", nombreclas:"nieto", id:"id", nombreid:"h0303"};
nietos=[nieto1,nieto2,nieto3,nieto4,nieto5,nieto6,nieto7,nieto8,nieto9];
padre1={clase:"class", nombreclas:"padre", id: "id", nombreid: "h01", nietos:[nieto1,
    nieto2,nieto3]};
padre2={clase:"class", nombreclas:"padre", id: "id", nombreid: "h02", nietos:[nieto4,
        nieto5,nieto6]};
padre3={clase:"class", nombreclas:"padre", id: "id", nombreid: "h03", nietos:[nieto7,
            nieto8,nieto9]};
padres=[padre1,padre2,padre3];

function crearElementos(quien,aquien,donde){
    elemento=document.createElement("div");
    elemento.setAttribute(quien.clase, quien.nombreclas);
    elemento.setAttribute(quien.id,quien.nombreid);
    aquien.insertAdjacentElement(donde,elemento);
    return elemento;
}

document.head=document.createElement("head");;
let cabecera=document.firstElementChild.children[0];
document.body=document.createElement("body");
let cuerpo=document.firstElementChild.children[1];

let abuelo=document.createElement('div');
abuelo.setAttribute("class","abuelo");
abuelo.setAttribute("id","el-abuelo");
cuerpo.insertAdjacentElement("beforeend",abuelo);
let textop=document.createElement('p');
textop.setAttribute("class", "texto-abuelo");
abuelo.insertAdjacentElement("beforeend", textop);

padres.forEach(padre => {      
    let padrenew=crearElementos(padre,abuelo,"beforeend");
    let textop=document.createElement('p');
    textop.setAttribute("class", "texto-padre");
    padrenew.insertAdjacentElement("beforeend", textop);  
    padre.nietos.forEach(nieto => {
        crearElementos(nieto,padrenew,"beforeend");
    });
  
});

