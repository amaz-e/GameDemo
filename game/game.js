// Define locations with initial stats
let locations = {
    A: { name: "Village A", inhabitants: 50, resources: 100, happiness: 50 },
    B: { name: "Town B", inhabitants: 80, resources: 120, happiness: 40 },
    C: { name: "City C", inhabitants: 120, resources: 150, happiness: 30 }
  };
  
  // Define possible events
  let events = [
    {
      name: "Harvest Festival",
      description: "Increases happiness and resources slightly.",
      apply: function(location) {
        location.happiness += 10;
        location.resources += 20;
      }
    },
    {
      name: "Bandit Raid",
      description: "Decreases resources and happiness.",
      apply: function(location) {
        location.happiness -= 15;
        location.resources -= 30;
      }
    },
    {
      name: "Epidemic",
      description: "Decreases inhabitants and happiness.",
      apply: function(location) {
        location.inhabitants -= 20;
        location.happiness -= 20;
      }
    },
    {
      name: "Trade Caravan",
      description: "Increases resources.",
      apply: function(location) {
        location.resources += 40;
      }
    },
    {
      name: "Festive Celebration",
      description: "Increases happiness in all locations.",
      apply: function(location) {
        for (let loc in locations) {
          locations[loc].happiness += 5;
        }
      }
    },
    {
      name: "Drought",
      description: "Decreases resources in all locations.",
      apply: function(location) {
        for (let loc in locations) {
          locations[loc].resources -= 10;
        }
      }
    },
    {
      name: "New Immigrants",
      description: "Increases inhabitants.",
      apply: function(location) {
        location.inhabitants += 30;
      }
    }
  ];
  
  // Function to simulate a turn
  function takeTurn(locationKey, actionKey) {
    let location = locations[locationKey];
    let action = getAction(actionKey);
  
    // Apply action effects
    applyActionEffects(action, location);
  
    // Apply random event effects
    let randomEvent = getRandomEvent();
    applyEventEffects(randomEvent, locations);
  
    // Check win condition
    checkWinCondition(location);
  
    // Display results
    displayResults(location);
  }
  
  // Function to get the selected action
  function getAction(actionKey) {
    let actions = {
      harvest: {
        name: "Harvest",
        description: "Increase resources."
      },
      defend: {
        name: "Defend",
        description: "Protect resources from raiders."
      },
      celebrate: {
        name: "Celebrate",
        description: "Boost happiness."
      },
      trade: {
        name: "Trade",
        description: "Trade resources for more resources."
      }
    };
    return actions[actionKey];
  }
  
  // Function to apply action effects
  function applyActionEffects(action, location) {
    switch (action.name) {
      case "Harvest":
        location.resources += 20;
        break;
      case "Defend":
        location.resources += 10;
        break;
      case "Celebrate":
        location.happiness += 15;
        break;
      case "Trade":
        location.resources += 30;
        break;
      default:
        console.log("Invalid action.");
    }
  }
  
  // Function to get a random event
  function getRandomEvent() {
    return events[Math.floor(Math.random() * events.length)];
  }
  
  // Function to apply event effects
  function applyEventEffects(event, locations) {
    console.log("Random Event: " + event.name);
    console.log("Description: " + event.description);
    for (let loc in locations) {
      event.apply(locations[loc]);
    }
  }
  
  // Function to check win condition
  function checkWinCondition(location) {
    if (location.happiness >= 100) {
      console.log("Congratulations! " + location.name + " is the happiest and you win!");
    }
  }
  
  // Function to display results
  function displayResults(location) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    resultsDiv.innerHTML += "<p>Location: " + location.name + "</p>";
    resultsDiv.innerHTML += "<p>Inhabitants: " + location.inhabitants + "</p>";
    resultsDiv.innerHTML += "<p>Resources: " + location.resources + "</p>";
    resultsDiv.innerHTML += "<p>Happiness: " + location.happiness + "</p>";
	
  }
  
  // Event listener for the Submit button
  document.getElementById("submitBtn").addEventListener("click", function() {
    let location = document.getElementById("locations").value;
    let action = document.getElementById("actions").value;
    takeTurn(location, action);
  });
  