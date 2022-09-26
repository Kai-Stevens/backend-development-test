// This file starts the server off, describes the basic data, and creates the API
const express = require("express");
const cors = require("cors");

const beasts = require("./beasts");
const logRoute = require("./route-logger");
// Make a basic server
const app = express();

//Allow requests from other origins
app.use(cors());
// Tell Express to always read the body of POST requests
app.use(express.json());

// Add middleware to log routes
app.use(logRoute);

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
    try {
        const id = parseInt(req.params.id);

        if (!id && id !==0) {
            throw "Invalid input!";
        } else if (id < 0 || id >= beasts.length) {
            throw "No such beast!";
        }

        const filtered = beasts.filter(b => b.id == req.params.id);
        res.send(filtered[0]);
        
    } catch(e) {
        res.status(404).send({error: e});
    }
});

app.post("/beasts", (req, res) => {
    // grab the beast data
    const newBeast = req.body;
    // add it to the list of beasts
    newBeast["id"] = beasts.length;

    beasts.push(newBeast);

    // return a message saying it worked (if it hangs it's probably because you missed this part)
    // generic code is 200
    res.status(201).send(newBeast);
});

// Exports
module.exports = app;