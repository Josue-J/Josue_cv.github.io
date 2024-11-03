const emailButton = document.getElementById('copy')
const CompetenciasT=document.querySelector(".nametag")
const btn_opciones = document.querySelectorAll(".btn-Proyectos")
// Initialize and add the map
let map;
let shapes = []; // Almacenaremos las formas en un arreglo
const changeDirectionInterval = 1000; // Tiempo en milisegundos para cambiar de dirección automáticamente


document.addEventListener("DOMContentLoaded", function() { 
    // Inicializar las figuras
    initializeShapes();

    // Ejecutar el movimiento continuo
    moveShapes();

    // Mover las otras figuras cada 5 segundos (opcional)
    setInterval(moveShapes2, 5000);

    // Función para copiar el correo electrónico al portapapeles
    btn_opciones.forEach(button => {
        button.addEventListener("click", btn_P_Click);
    });

       // Selecciona todos los elementos con la clase .black_bg
       const elements = document.querySelectorAll(".black_bg");

       elements.forEach(element => {
           element.addEventListener("mouseenter", () => {
               element.classList.add("animate"); // Añade la clase para activar la animación
           });
       });
});







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
                                <li><i class="bi bi-filetype-js"></i> JavaScript</li>
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