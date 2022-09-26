// This file starts the server off, describes the basic data, and creates the API
const express = require("express");
const cors = require("cors");

const beasts = require("./beasts");
// Make a basic server
const app = express();

//Allow requests from other origins
app.use(cors());
// Tell Express to always read the body of POST requests
app.use(express.json());

// Set up the server routes
app.get("/", (request, response) => {
    response.send("Welcome to the Bestiary");
});

app.get("/beasts", (request, response) => {
    response.send(beasts);
});

app.get("/beasts/random", (req, res) => {
    // Random int within the range of the dataset
    const randomIndex = Math.floor(Math.random() * Object.keys(beasts).length);

    // Return object at that id
    const filtered = beasts.filter((beast) => beast.id == randomIndex);
    res.send(filtered[0]);
});

app.get("/beasts/:id", (req, res) => {
    const filtered = beasts.filter((beast) => beast.id == req.params.id);
    res.send(filtered[0]);
});

app.post("/beasts", (req, res) => {
    // grab the beast data
    const newBeast = req.body;
    // add it to the list of beasts

    // return a message saying it worked (if it hangs it's probably because you missed this part)
    res.send(newBeast);
});

// Exports
module.exports = app;