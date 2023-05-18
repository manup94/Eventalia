
function initMap() {

    navigator.geolocation.getCurrentPosition(function (position) {
        let coordenadas = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        let mapa = new google.maps.Map(document.getElementById('map'), {
            center: coordenadas,
            zoom: 10
        });


        let marcador = new google.maps.Marker({
            position: coordenadas,
            map: mapa,
            title: 'Mi ubicación'
        });
    });
}