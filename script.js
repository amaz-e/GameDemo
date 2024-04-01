function toggleVisibility(id) {
  var elements = document.querySelectorAll('.toggle-element');
  elements.forEach(function(element) {
    if (element.id === id) {
      element.style.display = "block"; // Show the selected element
    } else {
      element.style.display = "none"; // Hide other elements
    }
  });
}
toggleVisibility('page');

let posts; // Declare posts variable outside to be accessible
let backgrounds;
let factions;

var file = "./map/page-data.json";
var factions_url = "./map/page-data.json";
var backgrounds_url = "./character/background.json";

fetchJSONData(file).then(data => {
    posts = data;
}).catch(error => {
    console.error("Unable to fetch data:", error);
});

fetchJSONData(backgrounds_url).then(data => {
    backgrounds = data;
}).catch(error => {
    console.error("Unable to fetch data:", error);
});

function fetchJSONData(url) {
    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            return data; // Return the data
        })
        .catch((error) => {
            console.error("Unable to fetch data:", error);
            throw error; // Rethrow the error
        });
}

function getPostByID(id) {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) { // Compare posts[i].id with id
            return {
                title: posts[i].title,
                content: posts[i].content,
            };
        }
    }
    return null; // Move this outside of the loop
}

function loadPostData(id) {
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-content');
    const post = getPostByID(id);
    if (post) {
        postTitle.textContent = post.title;
        postContent.textContent = post.content;
    } else {
        postTitle.textContent = "Post not found";
        postContent.textContent = "";
    }
}

function getBackground(id) {
    for (let i = 0; i < backgrounds.length; i++) {
		console.log("loop for" + backgrounds[i].title + " of id: " + backgrounds[i].id + " for function of id " + id);
        if (backgrounds[i].id == id) { // Compare background id		
            return {
                content: backgrounds[i].content,
            };
        }
    }
    return null; // Move this outside of the loop
}

function loadBackgroundData(id) {
    const backgroundContent = document.getElementById('character-background');
    const background = getBackground(id);
	
	if (background){
		backgroundContent.textContent = background.content;
	}
	
	else {
        backgroundContent.textContent = "Background not found";
    }
}



var input = document.getElementById("messageInput");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});