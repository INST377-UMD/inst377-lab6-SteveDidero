
var map = L.map('map').setView([37.0902, -95.7129], 4);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}


var coordinates = [
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) }
];


function updateMarker(markerId, latitude, longitude) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(res => res.json())
        .then(data => {
            document.getElementById(markerId).innerHTML = `<h2>Marker ${markerId.slice(-1)}: Latitude: ${latitude}, Longitude: ${longitude}</h2> <h3>Locality: ${data.locality || "Unknown locality"}</h2>`;
        })
        .catch(error => console.error('Error:', error));
}


coordinates.forEach((coord, index) => {
    var marker = L.marker([coord.lat, coord.lon]).addTo(map);
    updateMarker(`marker${index + 1}`, coord.lat, coord.lon);
});
