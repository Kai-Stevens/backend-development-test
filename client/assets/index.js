const getBeastData = async () => {
    try {
        // Grab the data
        const response = await fetch("http://localhost:3000/beasts");
        const beasts = await response.json();
        return beasts;

    } catch(error) {
        console.log(error);
    }
}

const displayBeastData = async () => {
    // Get the data
    const beasts = await getBeastData();
    // Get a reference to the cage
    const cage = document.querySelector("#cage");

    // Loop through the beast data
    for (let beast of beasts) {
        // create an html element
        let beastItem = document.createElement('li');

        // set content (use bracket notation)
        beastItem.textContent = beast["name"];

        // append to cage
        cage.append(beastItem);
    }
}

displayBeastData();

const createNewBeast = async (e) => {
    e.preventDefault();

    // Extract the data into an object
    const data = {
        name: e.target.name.value,
        encounterRate: e.target.encounterRate.value,
    }

    console.log(data);
    // Set the options for the fetch request
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    // Make a fetch request, sending the data
    const response = await fetch("http://localhost:3000/beasts", options);

    if (response.status == 201) {
        alert("Current creature created (cleverly)");
        window.location.reload();
    }
}

const myForm = document.querySelector("#create-form");
myForm.addEventListener('submit', createNewBeast);