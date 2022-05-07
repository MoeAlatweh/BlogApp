/**
 * TODO (Together): Create getPostIdParam to get the id of the post to use in the request later
 * TODO: Complete getPost function to get post data from API
 * TODO: Complete buildPost function to fill in the post data in the post.html file using ids
 */

const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
}

// to get id posts
const getPostIdParam = () =>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id")
}


const getPost = () => {
    // to get id from function above
    const postId = getPostIdParam();
    // url of post with id
    const post_url = `${API_URL}${postId}`;
    fetch(post_url,{
        method: 'GET'
        // you have to return response to json first 
    }).then((response)=>{
        return response.json();
        // then if promise happend go to build the post
    }).then((data)=>{
        buildPost(data);
    })
}

// to replace html element with data from API
const buildPost = (blogPosts) => {
    // HINT: Convert the date number to a Date string
    const postDate = new Date(parseInt(blogPosts.added_date)).toDateString();
    const postImage = `${API_BASE_URL}${blogPosts.post_image}`;
    // to put post image over the header image
    document.querySelector("header").style.backgroundImage = `url(${postImage})`;
    document.getElementById("individual-post-title").innerText= blogPosts.title; 
    document.getElementById("individual-post-date").innerText= `Published on ${postDate}`; 
    document.getElementById("individual-post-content").innerText= blogPosts.content; 

}

