/**
 * TODO: Finish submitNewPost function to submit form data to the API 
 */

const API_URL = "http://localhost:3000/api/posts";

const submitNewPost = () => {
    // HINT: Use FormData to store data to send over
    // HINT: Redirect the user to home page after successful submission
    // to get input from html
    let input = document.querySelector('input[type="file"]'); 
    const title = document.getElementById("form-post-title").value;
    const content = document.getElementById("form-post-content").value;

    // FormDate: it used to send data to API
    let data = new FormData();
    data.append("post-image", input.files[0]);
    data.append("title", title);
    data.append("content", content);

    // 1000: is time of one second to allow json data work between go to page and refresh
    fetch(API_URL, {
        method: "POST",
        body: data
    }).then(()=>{
        setTimeout(()=>{
            // after hit submit it will go to home page
            window.location.href = "index.html";
        }, 1000)
    })
}