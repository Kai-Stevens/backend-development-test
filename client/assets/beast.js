const getBeastId = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id;
}

const beastIndex = getBeastId();

const fetchBeasts = async (beastIndex) => {
    try {
      console.log(beastIndex);
      const response = await fetch(`http://localhost:3000/beasts/${beastIndex}`);
      const beastData = await response.json();
      console.log(beastData);
      console.log(beastData["name"]);
      
      // Read in the data and display it
      addInformation(beastData);
  
    } catch(error) {
      console.log(error);
    }
  }

fetchBeasts(beastIndex);

// Create Container for beast information
const addInformation = (beastData) => {
    const beastName = beastData["name"];
    const beastHabitat = beastData["habitat"];
    const beastDangerRating = beastData["dangerRating"];
    const beastDescription = beastData["description"];
    const beastEncounterRate = beastData["encounterRate"];
    const beastLoot = beastData["loot"];
    const beastLootString = beastLoot.join(", ");

    document.querySelector("#beast-header").textContent = beastName;
    document.querySelector("#beast-name").textContent = "Name: " + beastName;
    document.querySelector("#beast-habitat").textContent = "Habitat " + beastHabitat;
    document.querySelector("#beast-danger-rating").textContent = "Danger Rating: " + beastDangerRating;
    document.querySelector("#beast-description").textContent = "Description: " + beastDescription;
    document.querySelector("#beast-encounter-rate").textContent = "Encounter Rate: " + beastEncounterRate;
    document.querySelector("#beast-loot").textContent = "Loot: " + beastLootString;
}
