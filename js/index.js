
// get the URL from (app.js) file in API folder(BlogAppAPI) 
const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();
}

// used to fitch the post from API
const getPosts = () => {
    // use fetch with API URL to get posts data
    fetch(API_URL,{
        method: 'GET'
        // you have to return response to json first 
    }).then((response)=>{
        return response.json();
        // then if promise happend go to build the post
    }).then((data)=>{
        buildPosts(data);
    })

}

// used to build posts from front end
const buildPosts = (blogPosts) => {
    // create variable to add elements from HTML
    let blogPostsContent = "";
    // create for loop to go through the post
    for(blogPost of blogPosts){
        // because date in datbase usually saved in -iso way- we need to converted
        // so,create const to convert the data to somthing we can understand
        const postDate = new Date(parseInt(blogPost.added_date)).toDateString();
        // to get post images from API, then added as style in class"post-image" below
        const postImage = `${API_BASE_URL}${blogPost.post_image}`;
        // to create link foe each post by use id from API, need to add class in style.css file to hide the underline of link
        const postLink = `/C:/Users/Owner/OneDrive/Desktop/JavaScriptCourse/BlogApp/post.html?id=${blogPost.id}`;                
        // (+=): to append data by use -leteral string- method with parameters(ex:title) from API
        blogPostsContent += `
        <a class="post-link" href="${postLink}">
            <div class="post">
                <div class="post-image" style="background-image: url(${postImage})"></div>
                <div class="post-content">
                    <div class="post-date">${postDate}</div>
                    <div class="post-title">${blogPost.title}</div>
                    <div class="post-text">${blogPost.content}</div>
                </div>
            </div>
        </a>    
        `

    }
    // to replace HTML element with content we have from data file
    document.querySelector('.blog-posts').innerHTML = blogPostsContent
}