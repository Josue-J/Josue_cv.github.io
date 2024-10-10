/* const emailButton = document.getElementById('copy')
emailButton.addEventListener('click', ()=>{
    const emailAddress = 'josue.ch997@gmail.com'
    navigator.clipboard.writeText(emailAddress);
    emailButton.innerHTML= 'Copied!'
    emailButton.classList.remove('btn-light');
    emailButton.classList.add('btn-success');
    setTimeout(() => {
      emailButton.innerHTML = 'Copiar';
      emailButton.classList.remove('btn-success');
      emailButton.classList.add('btn-light');
    }, 5000);
})
 */

document.addEventListener("DOMContentLoaded", function() {
    // Inicializar las figuras
    initializeShapes();

    // Ejecutar el movimiento continuo
    moveShapes();

    // Mover las otras figuras cada 5 segundos (opcional)
    centerShapes();
    setInterval(moveShapes2, 5000);

});

// Initialize and add the map
let map;

async function initMap() {
  // The location of Tigre
  const position = { lat:14.64072, lng:  -90.51327};
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  console.log('estoy funcionando');
  
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Tigre
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Tigre
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Mi Ubicacion",
    
  });
}
let shapes = []; // Almacenaremos las formas en un arreglo
const changeDirectionInterval = 1000; // Tiempo en milisegundos para cambiar de dirección automáticamente

// Inicializar posiciones y propiedades de las figuras
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

// Función para centrar las figuras opcionalmente
function centerShapes() {
    const container = document.querySelector('.container--icons');
    const shapes2 = document.querySelectorAll('.shape2');
    const centerX = (container.clientWidth - 50) / 2;
    const centerY = (container.clientHeight - 50) / 2;
        
    shapes2.forEach(shape => {
        shape.style.transform = `translate(${centerX}px, ${centerY}px)`;
    });
}





initMap();