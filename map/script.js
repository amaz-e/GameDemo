function hideElem(id) {
    document.getElementById(id).style.display = "none";
}
hideElem('mainpage');

let posts; // Declare posts variable outside to be accessible

fetchJSONData().then(data => {
    posts = data;
}).catch(error => {
    console.error("Unable to fetch data:", error);
});

function fetchJSONData() {
    return fetch("http://aemaze.studio/webp/page-data.json")
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