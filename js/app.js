
const btn_gits= document.querySelector('.btn-gits')
const btntrabajemos = document.getElementById('trabajemos')
const emailButton = document.getElementById('copy')
const CompetenciasT=document.querySelector(".nametag")
let btn_Proyectos //= document.querySelectorAll(".btn-Proyectos")
const btn_Competencias = document.querySelectorAll(".btn-Competencias")
const contenidoCompetancias=document.querySelector(".competencias--contenido")

// Initialize and add the map
let map;
let shapes = []; // Almacenaremos las formas en un arreglo
const changeDirectionInterval = 1000; // Tiempo en milisegundos para cambiar de dirección automáticamente

let listaCompetencias=[];
let proyectosrecientes=[];


class Competencia {
    constructor(competencia, nivel, intnivel, type, icono) {
        this.competencia = competencia;
        this.nivel = nivel;
        this.intnivel = intnivel;
        this.type = type;
        this.icono = icono;
    }
}

class Proyecto {
    constructor(nombre, descripcion,objetivos, tecnologias ,porcentaje,ittext=null) {
        this.nombre = nombre;
        this.objetivos = objetivos;
        this.descripcion = descripcion;
        this.tecnologias = tecnologias;
        this.porcentaje = porcentaje;
        this.ittext=ittext;

    }
    
}



document.addEventListener("DOMContentLoaded", function() { 
   
    //*animacion de portadas
    // Inicializar las figuras
    initializeShapes();

     // Mover las otras figuras cada 5 segundos (opcional)
     setInterval(moveShapes2, 5000);


    moveShapes();



    //carga contenido de la pagina sobre mi carga de competencias y proyectos
    cargadatos();
    //console.log('cbtngit', btn_gits);

   btn_gits.addEventListener('click',writeProyect);
 

   //*seccion conpetencias iconos y nonbres
   
    // Función para copiar el correo electrónico al portapapeles
    btn_Competencias.forEach(button => {
        button.addEventListener("click", btn_Comp_Click);
    });
    
    //*botnes de proyectos recientes
     
});


function activarbtnProyectos( ){
    const btn_Proyectos = document.querySelectorAll(".btn-Proyectos");
    console.log(btn_Proyectos.length);
    btn_Proyectos.forEach(button => {
        button.addEventListener("click", btn_P_Click);
        console.log('boton activado');
    });
}
function cargadatos(){
    sobremi();
    cargarCompetencias();
    cargarProyectos();
}

function gits_show(e){
    


}

function eliminarTodosLosHijos(e) {
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }
}

function btn_Comp_Click(e) {
    const button = e.target;
    console.log(button.textContent);
    console.log(button.dataset.option);
    
    // Limpia el panel donde se encuentran las competencias
    eliminarTodosLosHijos(contenidoCompetancias);
    
    // Recorre la lista de competencias y muestra las que cumplen con el filtro
    listaCompetencias.forEach(item => {
        if (item.type == button.dataset.option) {
            console.log(item.competencia);
            
            // Crea y agrega el div antes del botón con innerHTML
            const newDiv = document.createElement("div");
            
            newDiv.classList.add("col-lg-3");

            const newDiv2=document.createElement("div");
            newDiv2.classList.add("div-competencias");
            
            newDiv2.innerHTML += ` <h4 class="text-center Competencias-title">${item.competencia}</h4>`;

             const newdiv3=document.createElement("div");
            newdiv3.classList.add("icon-container", "d-flex","justify-content-center", "align-items-center");

            newdiv3.innerHTML += ` <img src="${item.icono}" alt="Icono de ${item.competencia}">`;
            newDiv2.appendChild(newdiv3);


            const newDiv4=document.createElement("div");
            newDiv4.classList.add("skill-level", "d-flex", "justify-content-center");   

                

            // Calcular el nivel y agregar los diamantes
            for (let i = 0; i < 5; i++) {
                if (i < Math.floor(item.intnivel)) {
                    newDiv4.innerHTML += `<span class="diamond active"></span>`;
                } else if (i === Math.floor(item.intnivel) && !Number.isInteger(item.intnivel)) {
                    newDiv4.innerHTML += `<span class="diamond half"></span>`;
                } else {
                    newDiv4.innerHTML += `<span class="diamond"></span>`;
                }
            }
             // Agregar el nuevo div al contenedor

            newDiv2.appendChild(newDiv4);


            
            
            newDiv2.innerHTML += `
            </div>
            <p class="text-center level-description">${item.nivel}</p>
            
            
            `;
            
            newDiv.appendChild(newDiv2);
           
            contenidoCompetancias.appendChild(newDiv);
        }
    });
}


function sobremi(){
    const sobremi_cont=document.querySelector(".sobremi--texto");
    let descripcionhtml;
    fetch('../data/sobremi.json')

    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json(); // Convierte la respuesta en JSON
    })
    .then(data => {
        const descripcionhtml = data[0]; // Obtiene la descripción del JSON
      
       // console.log("1. "+descripcionhtml) // Opcional: para depuración
        sobremi_cont.innerHTML= descripcionhtml.descripcion;
        
    })
    .catch(error => console.error("Error al cargar la descripción:", error));

    //console.log("2."+ descripcionhtml);
    
}

function cargarProyectos() {
    fetch('data/ProyectosRecientes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Añadir cada elemento a la listaCompetencias
            data.forEach(item => {
                let itext1;
                if  (item.ittext==null){
                    itext1= item.ittext
                }
                proyectosrecientes.push(
                    new Proyecto(item.nombre, item.descripcion, item.objetivos, item.tecnologias, item.porcentaje, itext1)
                );
                //console.log(item.nombre);
            });
           
            
            //console.log("competencias agregados a la lista");
           //console.table(listaCompetencias); // Verificar en consola
           if (proyectosrecientes.length>0){
            
            writeProyect()
            activarbtnProyectos();                                         
            }

            
            //mostrarCompetencias(listaCompetencias); // Llamar función para mostrar en HTML
        })
        .catch(error => console.error(error));



}
function writeProyect(){
    let contador = 1;
    const divProyectos = document.querySelector('.div--proyectos');
    

    proyectosrecientes.forEach(item => {
       // console.log(item.porcentaje);

            newDiv = document.createElement("div");
            let classes = 'col-lg my-4 my-md-2 proyectos_desarollo box'.split(' ');
            classes.forEach(cls => newDiv.classList.add(cls));
            
            let newdivRibbon=document.createElement("div");
            newdivRibbon.classList.add("ribbon");
            newdivRibbon.innerHTML = `<span>en desarrollo </span>`;
            newDiv.appendChild(newdivRibbon);

           let newh4=document.createElement("h4");
           let classes2 = 'text-center display-5 display-md-3 my-3 titulosh4'.split(' ');
            classes2.forEach(cls2 => newh4.classList.add(cls2));
            
            newh4.innerHTML=item.nombre;
            newDiv.appendChild(newh4);

            let newh5   =document.createElement("h5");
            newh5.textContent= "Descripcion :";
            newDiv.appendChild(newh5);
            
            let newp=document.createElement("p");
            newp.textContent=item.descripcion||"DESCRIPCION";
            newDiv.appendChild(newp);

            let newh5_2=document.createElement("h5");

            newh5_2.textContent="Progreso:";
            newDiv.appendChild(newh5_2);

                // Crear barra de progreso
            newDiv.innerHTML += `
            <div class="progress-container">
                <div class="progress-background">
                    <div class="progress-bar" style="width: ${item.porcentaje};"></div>
                </div>
                <span class="progress-percentage">${item.porcentaje}</span>
            </div>
            <div class="d-flex justify-content-center justify-content-md-end">
                <button data-option="${contador}" value="inactive" class="btn btn-light my-4 px-4 py-2 rounded-pill btn-Proyectos">
                    <i class="bi bi-eye"></i> Ver más..
                </button>
            </div>`;

            const lastChild = divProyectos.lastElementChild;
divProyectos.insertBefore(newDiv, lastChild);   
contador++;

        
    });

    





}









// Función para cargar el JSON y agregar objetos a la lista
function cargarCompetencias() {

    fetch('data/competencias.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Añadir cada elemento a la listaCompetencias
            data.forEach(item => {
                listaCompetencias.push(
                    new Competencia(item.competencia, item.nivel, item.intnivel, item.type, item.icono)
                );
            });
            //console.log("competencias agregados a la lista");
           //console.table(listaCompetencias); // Verificar en consola
           if (listaCompetencias.length>0){
               mostrarCompetenecias();}
            //mostrarCompetencias(listaCompetencias); // Llamar función para mostrar en HTML
        })
        .catch(error => console.error(error));

        
}



function mostrarCompetenecias(){
    //console.log("mostrar competencias inicio  ya cargadas");
    //console.table(listaCompetencias.length);
    // Recorre la lista de competencias y muestra las que cumplen con el filtro
    listaCompetencias.forEach(item => {
       
           // console.log(item.competencia);
            
            // Crea y agrega el div antes del botón con innerHTML
            const newDiv = document.createElement("div");
            
            newDiv.classList.add("col-lg-3");

            const newDiv2=document.createElement("div");
            newDiv2.classList.add("div-competencias");
            
            newDiv2.innerHTML += ` <h4 class="text-center Competencias-title">${item.competencia}</h4>`;

             const newdiv3=document.createElement("div");
            newdiv3.classList.add("icon-container", "d-flex","justify-content-center", "align-items-center");

            newdiv3.innerHTML += ` <img src="${item.icono}" alt="Icono de ${item.competencia}">`;
            newDiv2.appendChild(newdiv3);


            const newDiv4=document.createElement("div");
            newDiv4.classList.add("skill-level", "d-flex", "justify-content-center");   

                

            // Calcular el nivel y agregar los diamantes
            for (let i = 0; i < 6; i++) {
                if (i < Math.floor(item.intnivel)) {
                    newDiv4.innerHTML += `<span class="diamond active"></span>`;
                } else if (i === Math.floor(item.intnivel) && !Number.isInteger(item.intnivel)) {
                    newDiv4.innerHTML += `<span class="diamond half"></span>`;
                } else {
                    newDiv4.innerHTML += `<span class="diamond"></span>`;
                }
            }
             // Agregar el nuevo div al contenedor

            newDiv2.appendChild(newDiv4);


            
            
            newDiv2.innerHTML += `
            </div>
            <p class="text-center level-description">${item.nivel}</p>
            
            
            `;
            
            newDiv.appendChild(newDiv2);
           
            contenidoCompetancias.appendChild(newDiv);
        
    });



}

function btn_P_Click(e) {
        const button = e.target; // Obtiene el botón que fue clickeado
        const currentState = button.value; // Obtiene el estado actual del botón




       
        // Cambia el estado en función del value
        if (currentState === "inactive") {
            button.value = "active";
            button.innerHTML = `<i class="bi bi-eye-slash"></i> ver menos`;
            opcionesbtn_write(e, currentState);
             // Muestra que el botón está activo
        } else {
           
            button.innerHTML = ` <i class="bi bi-eye"></i> ver mas...`; // Muestra que el botón está inactivo
            let infoDiv = button.previousElementSibling;
            if (infoDiv && infoDiv.classList.contains("divP-info") && currentState === "active") 
                // Si existe y el botón pasa a estado inactivo, elimina el div
            {
                    infoDiv.remove();
                }

                button.value = "inactive";
       
        }
    
        // Llama a la función para registrar el cambio de estado
        //logButtonStatus(button);
}

function opcionesbtn_write(e){
    const button = e.target; // Obtiene el botón que fue clickeado
    //console.log(button.getAttribute('data-option'));

      // Crea y agrega el div antes del botón con innerHTML
      const newDiv = document.createElement("div");
     
     newDiv.classList.add("divP-info");
    

    switch(button.getAttribute('data-option')){
        case '1': //proyecto 1
           // console.log('hola');

           newDiv.innerHTML = `
             <div class="Contenidop1 btn-Pcont">
                            <h5>Objetivos</h5>
                            <ul>
                                <li>Aplicar conocimientos sobre las fases léxica y sintáctica de un compilador para la creación de un intérprete sencillo con funcionalidades básicas.</li>
                                <li>Implementar un proceso de interpretación de código de alto nivel aplicando los conceptos de compiladores.</li>
                                <li>Analizar un lenguaje de programación y generar las salidas esperadas utilizando la teoría de compiladores.</li>
                                <li>Desarrollar soluciones de software aplicando la teoría de compiladores.</li>
                                <li>Desarrollar aplicaciones utilizando la arquitectura cliente-servidor.</li>
                           
                               
                            </ul>
                            <h5>Tecnologias para su desarrollo</h5>
                            <ul class="list-unstyled">
                                <li> JavaScript</li>
                                <li><i class="bi bi-filetype-js"></i> TypeScrip</li>
                                <li><i class="bi bi-gear"></i> Jison</li>
                                <li> <i class="bi bi-gear-fill"></i> Node.JS </li >
                                <li><i class="bi bi-filetype-html"></i>  html</li>
                                <li><i class="bi bi-filetype-css"></i> css</li>
                                <li> <i class="bi bi-gitlab"></i> Git & Git Lab</li>

                            </ul>
                           
                        </div>
       `;



            
            break;  

        case '2': // proyecto 2
            //console.log('hola2');
            newDiv.innerHTML = `
                <div class="contenidop2 btn-Pcont">
                                <h5>Objetivos</h5>
                                <ul>
                                    <li>Aplicar y reforzar conocimientos sobre TDA (Tipos Abstractos de Datos), implementando únicamente estos en el proyecto.</li>
                                    <li>Comprender y desarrollar distintos tipos de estructuras de datos no lineales.</li>
                                    <li>Definir e implementar algoritmos de búsqueda, recorrido y eliminación en estructuras de datos.</li>
                              
                                 
                                </ul>
                                <h5>Estructuras  TDS Implementadas</h5>
                                <ul >
                                    <li>Pilas</li>
                                    <li> Listas Enlazadas Simples</li>
                                    <li> Listas doblemente Enlazadas</li>
                                    <li> Matriz dispersa</li>
                                    <li> Arbol AVL</li>
                                    <li> Arbol ABB</li>
                                    <li> Arbol B </li>
                                    <li> Grafos </li>
                                 
                                </ul>
                                <h5>Tecnologias para su desarrollo</h5>
                                <ul class="list-unstyled">
                                    <li><i class="bi bi-filetype-js"></i> c++</li>
                                    <li>  <i class="bi bi-github"></i> Git & GitHub </li>
                                 
                                </ul>




                            </div>
            
            
            `; // Usando innerHTML
            break;
        case '3'://*proyecto 3
            //console.log('hola3');
            newDiv.innerHTML = `
            <h5>Objetivos</h5>
            <ul>
                <li>Desarrollar una plataforma personal donde los potenciales clientes o empleadores puedan ver mis proyectos y habilidades.</li>
                <li>Crear un diseño visualmente atractivo y funcional que sea accesible desde diferentes dispositivos.</li>
                <li>Integrar secciones para proyectos actuales, tecnologías en uso, y una descripción clara de mis habilidades.</li>
            </ul>
            <h5>Tecnologías para su desarrollo</h5>
            <ul class="list-unstyled">
                <li><i class="bi bi-filetype-html"></i> HTML</li>
                <li><i class="bi bi-filetype-css"></i> CSS</li>
                <li><i class="bi bi-filetype-js"></i> JavaScript</li>
                <li><i class="bi bi-bootstrap"></i> Bootstrap</li>
                <li><i class="bi bi-github"></i> GitHub Page</li>
            </ul>
        `;
          
            break;
        default:
            console.log('opcion no valida ');
            return;
        
    }
    button.insertAdjacentElement("beforebegin", newDiv);

}



function initializeShapes() {

    const shapeElements = document.querySelectorAll('.shape');
    
    const container = document.querySelector('.container--icons');

    shapeElements.forEach(shape => {
        // Colocar en una posición inicial aleatoria
        const x = Math.random() * (container.clientWidth - 50); // Resta el tamaño del ícono
        const y = Math.random() * (container.clientHeight - 50); // Resta el tamaño del ícono

        shape.style.transform = `translate(${x}px, ${y}px)`;

        // Inicializar las propiedades de dirección y velocidad
        shape.directionX = Math.random() < 0.5 ? -1 : 1; // -1 o 1
        shape.directionY = Math.random() < 0.5 ? -1 : 1; // -1 o 1
         // Ajusta la velocidad de movimiento

        // Almacenar la forma en el arreglo para manejar el movimiento
        shapes.push(shape);
        shape.speed = 0.2; // Ajusta la velocidad de movimiento

        // Cambiar la dirección después de un intervalo definido (opcional, si quieres cambios automáticos)
        setInterval(() => {
            shape.directionX = Math.random() < 0.5 ? -1 : 1; // Cambiar dirección aleatoriamente
            shape.directionY = Math.random() < 0.5 ? -1 : 1; // Cambiar dirección aleatoriamente
        }, changeDirectionInterval);

        // Agregar evento de clic para cambiar la dirección al hacer clic
        shape.addEventListener('click', () => {
            shape.directionX *= -1; // Cambia la dirección en X
            shape.directionY *= -1; // Cambia la dirección en Y
        });
    });
}

// Función para mover las figuras de forma continua
function moveShapes() {
    const container = document.querySelector('.container--icons');

    shapes.forEach(shape => {
        const rect = shape.getBoundingClientRect();
        let x = rect.x - container.getBoundingClientRect().x;  // Ajusta la posición relativa al contenedor
        let y = rect.y - container.getBoundingClientRect().y;  // Ajusta la posición relativa al contenedor

        // Actualizar posición con un pequeño incremento
        x += shape.directionX * shape.speed;  // Ajusta la velocidad
        y += shape.directionY * shape.speed;  // Ajusta la velocidad

        // Lógica de límites (evitar que se salga del contenedor)
        if (x < 0) {
            x = 0;
            shape.directionX *= -1; // Cambiar dirección
        }
        if (x + rect.width > container.clientWidth) {
            x = container.clientWidth - rect.width; // Límite derecho
            shape.directionX *= -1; // Cambiar dirección
        }
        if (y < 0) {
            y = 0;
            shape.directionY *= -1; // Cambiar dirección
        }
        if (y + rect.height > container.clientHeight) {
            y = container.clientHeight - rect.height; // Límite inferior
            shape.directionY *= -1; // Cambiar dirección
        }

        // Aplicar nuevas posiciones con un desplazamiento suave
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Continuar el ciclo de animación para un movimiento fluido
    requestAnimationFrame(moveShapes);
}


// Función para mover otras figuras cada cierto tiempo (opcional, si tienes otro grupo de figuras)
function moveShapes2() {
    const shapes2 = document.querySelectorAll('.shape2');
    const container = document.querySelector('.container--icons');
       
    shapes2.forEach(shape => {
        shape.style.visibility = 'visible';
        const x = Math.random() * (container.clientWidth - 50);
        const y = Math.random() * (container.clientHeight - 50);
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
}

CompetenciasT.addEventListener('click',()=>{
    console.log('hola');
    alert("I am an alert box!");  
});