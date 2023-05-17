// function initMap() {
//     // Coordenadas para el puntero
//     var coordenadas = { lat: 40.3926, lng: -3.6988 };

//     // Crear un mapa nuevo centrado en las coordenadas
//     var mapa = new google.maps.Map(document.getElementById('map'), {
//         center: coordenadas,
//         zoom: 10 // Puedes ajustar el nivel de zoom según tus necesidades
//     });

//     // Agregar el puntero al mapa
//     var marcador = new google.maps.Marker({
//         position: coordenadas,
//         map: mapa,
//         title: 'Mi ubicación' // Opcional: un título para el puntero
//     });
// }

function initMap() {
    // Crear un mapa nuevo centrado en las coordenadas actuales
    navigator.geolocation.getCurrentPosition(function (position) {
        var coordenadas = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        var mapa = new google.maps.Map(document.getElementById('map'), {
            center: coordenadas,
            zoom: 10
        });

        // Agregar el marcador en las coordenadas actuales
        var marcador = new google.maps.Marker({
            position: coordenadas,
            map: mapa,
            title: 'Mi ubicación'
        });
    });
}