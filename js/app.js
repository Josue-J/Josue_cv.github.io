const emailButton = document.getElementById('copy')
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

initMap();