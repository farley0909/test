// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
async function initMap(): Promise<void> {
  //Centraliza o mapa em cajazeiras
  const cajazeiras = { lat:  -6.88634, lng:  -38.5614 };
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 14,
      center: cajazeiras,
    }
  );
try {
  let request = await fetch('http://localhost:8080/locais/')
  let pontos = await request.json()
  pontos.Resultado.forEach(element => {
   
    let splitado = element.st_astext.split('(')
    let t = splitado[1].split(')')
    let c = t[0].split(' ')
    let lat = c[0]
    let long = c[1]
  
    console.log("Latitude: ", parseFloat(lat), "Longitude", long)
    let defPos = {lat: parseFloat(lat), lng: parseFloat(long)}
    const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">'+element.nome+'</h1>' +
    '<div id="bodyContent">' +
    "<p>"+element.descricao+"</p>"+
    "</div>" +
    "</div>";
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: element.nome,
    });
    const marker = new google.maps.Marker({
      position: defPos,
      map,
      title: element.nome,
    });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    })
  });
} catch (error) {
  
  
}






//fechaModal
const  btnCancelar= document.getElementById("cancelar")
btnCancelar.addEventListener("click", fechaModal)
map.addListener('click',async (event)=>{
  let lat = event.latLng.lat()
  let long = event.latLng.lng()
  await exibirModal(lat, long, map)
})
  // This event listener calls addMarker() when the map is clicked.

  // Add a marker at the center of the map.
}
function fechaModal(){
  let fade = document.getElementById("fade")
  let modal = document.getElementById("modal")
  fade.style.display="none"
  modal.style.display="none"
}
function exibirModal(lat, long, map){
  let fade = document.getElementById("fade")
  let modal = document.getElementById("modal")
  fade.style.display="block"
  modal.style.display="block"
  const btnAdicionar = document.getElementById("adicionar")
  btnAdicionar.addEventListener("click",async ()=>{  
    let nomeHemonucle = (<HTMLInputElement>document.getElementById("hemonucleoNome")).value;
    let desc = (<HTMLInputElement>document.getElementById("descricao")).value;
    await salvaDados(nomeHemonucle, desc, lat, long)
    addMarker(lat, long, nomeHemonucle, desc, map)
    location.reload()
  })
  //return {nomeHemonucle, desc}
 

}
async function salvaDados(nome, desc, lat, long){
  let data = {
    nome:nome,
    desc:desc,
    lat:lat,
    long:long
  }
  try {
    let res = await fetch('http://localhost:8080/cadastro/', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body:JSON.stringify(data)
    })
let req = await res.json()
console.log("Resposta: ", req)
  } catch (error) {
    console.log(error.message)
  }
     
}
// Adds a marker to the map.
function addMarker(lat, long, nome, desc, map) {
  
  const p = new google.maps.Marker({
    position: {lat:lat, lng:long},
    map: map,
  });
  p.addListener('click', ()=>{
    console.log('cliqou', p.getPosition().lat())
  })
}

window.initMap = initMap;
