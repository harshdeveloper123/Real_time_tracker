<<<<<<< HEAD
// const express = require("express");
// const app = express();
// const http = require("http");
// const socketio = require("socket.io");
// const path = require("path"); // <-- Fix: Add this line
// const server = http.createServer(app);
// const io = socketio(server);

// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public"))); // <-- also change `set` to `use`
// io.on("connection",function(socket){
//     socket.on("send location", function(data){
//         io.emit("receive-location",{id:socket.id, ...data})
//     })
//     // console.log("connected")
//     socket.on("disconnet",function(){
//         io.emit("user-dosconnected",socket.id)
//     })
// });
// app.get("/", function(req, res) {
//     res.render("index");
// });

// // server.listen(3000, () => {
// //     console.log("Server is running on http://localhost:3000");
// // });
// server.listen(3000)
const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const server = http.createServer(app);
const io = socketio(server);

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Explicitly set views folder

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Socket.io events
io.on("connection", function(socket) {
    console.log("User connected:", socket.id);

    socket.on("send location", function(data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function() {  // ✅ Fix: typo corrected from "disconnet"
        io.emit("user-disconnected", socket.id);
    });
});

// Render the EJS page
app.get("/", function(req, res) {
    res.render("index");
});

// Use environment port for Render or 3000 locally
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

=======
const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path"); // <-- Fix: Add this line
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // <-- also change `set` to `use`
io.on("connection",function(socket){
    socket.on("send location", function(data){
        io.emit("receive-location",{id:socket.id, ...data})
    })
    // console.log("connected")
    socket.on("disconnet",function(){
        io.emit("user-dosconnected",socket.id)
    })
});
app.get("/", function(req, res) {
    res.render("index");
});

// server.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
// });
server.listen(3000)
>>>>>>> 539d853734a3c3f645aa3d2936f2190a05a1ebb1
