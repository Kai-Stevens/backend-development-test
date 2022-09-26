// This file starts the server off, describes the basic data, and creates the API
const express = require("express");
const beasts = require("./beasts")
// Make a basic server
const app = express();

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

// Exports
module.exports = app;