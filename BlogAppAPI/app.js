// that's to get express module to use it in js file
const express = require("express");
// to initelize the app
const app = express();
//  to import the module (posts.js file)
const Post = require ("/Users/Owner/OneDrive/Desktop/JavaScriptCourse/BlogAppSources/pwj-module-8-my-blog-api-master/exercise/api/models/posts");
// to initelize the class on posts.js file
const postsData = new Post();

// that's to get multer module to use to load the files (images)
const multer  = require('multer');

// to upload images either extintion is (png) or (jpg)
// (getExt): is function used to return extention of the file
const getExt = (mimetype) => {
    switch(mimetype){
        case "image/png":
            return '.png';
        case "image/jpeg":
            return '.jpg';
    }
}

// create storage to have uploaded files in destination (uploads)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
});
// // to upload images either extintion is (png) or (jpg)
// // (getExt): is function used to return extention of the file
// const getExt = (mimetype) => {
//     switch(mimetype){
//         case "image/png":
//             return '.png';
//         case "image/jpg":
//             return '.jpg';
//     }
// }

let upload = multer({ storage: storage });
// to make it work for windows users
// let path = req.file.path.replace("\\", "/");




// to give permission to front end to get data from the API you need to add the following
// (*) : mean allow to get everything from anyone
// (next) : to go to next function (or go to read the rest of code after this line)
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

// to make (uploads) public to can show images on front end you need to add following
app.use('/uploads', express.static('uploads'));

// because we need to create new post,we need to convert json to javascript object to be able to use it
app.use(express.json());
app.use(express.urlencoded());

//  (/api/posts) : is path link
// postsData : is the const variable we save the class(Post) from (posts.js)
// .get() : function inside (posts.js) to read the data
app.get("/api/posts", (req, res)=>{
    res.status(200).send(postsData.get());
     })


//  to get exist post
// status(200) : is mean successful repond
// (/api/posts/:post_id) : path of specific post id  
app.get("/api/posts/:post_id",(req,res)=> {
    // params : used to get the value of spacific id
    const postId = req.params.post_id
    // use function(getIndividualBlog) from(posts.js) to get the post 
    const foundPost = postsData.getIndividualBlog(postId);
    // if you found it return the post
    if(foundPost){
        res.status(200).send(foundPost);
        // if not return "Not Found" page 
    }else{
        res.status(404).send("Not Found");
    }
});     

// to create new post
app.post("/api/posts", upload.single("post-image") , (req,res)=>{
    const newPost = {
        // we going to use date.now as id 
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": req.file.path.replace("\\", "/"),
        "added_date": `${Date.now()}`, 
    } 
    postsData.add(newPost);
    // 201: mean something have been added 
    res.status(201).send(newPost);

})


// to create simple home page
// (/): is the home page 
// (req): is mean request 
// (res): is mean response
// (=>): to create function
    /* app.get("/", (req, res)=>{
    //     res.status(200).send("Hello World")
     }); */


// to initilize our app server
app.listen(3000, ()=>console.log("Listening on http://localhost:3000/"));


// app.listen(3000, ()=>console.log("Listening on http://localhost:3000"));