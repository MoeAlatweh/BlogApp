const dataPath = "./data.json";
//  to be able read json data
const fs = require('fs');

class Post {

    get() {
        // get post function
        return this.readData();
    }

    getIndividualBlog(postId) {
        //  get one blog post function
        // to read all the posts data
        const posts = this.readData();
        // use find() function to find id of the post
        // mean give me the post (you already have) if its id match with the postId I use now   
        const foundPost = posts.find((post) => post.id == postId);
        return foundPost;
    }

    add(newPost) {
        // add new post function
        // to read the existing data we already have in (data.json) file
        const currentPost = this.readData();
        // to add the new data to top of data file and avoid saving over the existion data
        currentPost.unshift(newPost);
        // call all the data after we add the new data
        this.storeData(currentPost);
    }

    readData(){
        // to read data from json file(data.json)
        let rawdata = fs.readFileSync(dataPath);
        // to save the data on variable(posts) to use it later
        let posts = JSON.parse(rawdata);
        return posts
    }

    storeData(rawdata){
        // create variable to create new data to add it to json file(data.json) 
        let data = JSON.stringify(rawdata);
        // to be able to write(add) new data to json file(data.json)
        fs.writeFileSync(dataPath, data);
    }

}



// every time you want to import a module (the object (Post) inside cuurent file(posts.js) that you want to use inside another file(app.js))>>
// >> the model should be exported like below
module.exports = Post;