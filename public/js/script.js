const socket = io();
let mySocketId = null;

socket.on("connect", () => {
    mySocketId = socket.id;
});

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send location", { latitude, longitude });
        },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap"
}).addTo(map);

// Only one marker: your own
const myMarker = L.marker([0, 0]).addTo(map);

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    if (id === mySocketId) {
        myMarker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude], 16);
    }
    // Ignore others
});
