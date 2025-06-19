const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const server = http.createServer(app);
const io = socketio(server);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // important!

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Socket.io logic
io.on("connection", function (socket) {
    console.log("User connected: " + socket.id);

    socket.on("send location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    });
});

// Render the frontend
app.get("/", function (req, res) {
    res.render("index");
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
