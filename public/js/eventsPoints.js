let myMap

function initViewMarkers() {
    initMap()
    getEventsJSON()
}


function initMap() {
    myMap = new google.maps.Map(
        document.querySelector('#map'),
        { zoom: 12, center: { lat: 40.392521370648154, lng: - 3.6989879718518366 } }
    )

}

function getLastPart(url) {
    const parts = url.split('/');
    return parts.at(-1);
}

function getEventsJSON() {

    const fullURL = window.location.href
    const event_id = getLastPart(fullURL)
    console.log(fullURL);
    console.log(event_id);


    fetch(`/api/internalEvent/${event_id}`)
        .then(res => res.json())
        .then(eventJSON => renderEventsMarker(eventJSON))
        .catch(err => console.log(err))
}


function renderEventsMarker(eventJSON) {

    const position = { lat: eventJSON.location.coordinates[0], lng: eventJSON.location.coordinates[1] }

    new google.maps.Marker({
        map: myMap,
        position,
        title: eventJSON.title
    })
}
