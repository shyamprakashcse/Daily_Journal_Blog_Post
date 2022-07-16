const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require("lodash");


const HomeContent = "Explore Your day with DailyJournal blogs .we can assure that you would learn something new about technology and make your day knowledgable.";
const AboutContent = "We are providing a content of technology,facts etc.Stay Tuned with us.Keep Track of daily content .Explore your skills with us";
const contactContent = "Shyam Prakash M,"
const contactcontent2 = "No 28,EzhilNagar,Kodungayur,Chennai-118,India.";
const mail = "shyamprakash.cse@gmail.com"

const d = new Date();
const Year = d.getFullYear();
var posts = []
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

function get(title, content) {
    res.render("sample", { TITLE: title, CONTENT: content });
};


//get routing 

app.get("/home", function(req, res) {
    res.render("Home", { STARTINGCONTENT: HomeContent, DATE: Year, posts: posts });
});
app.get("/contact", function(req, res) {
    res.render("Contact", { CONTACTCONTENT: contactContent, DATE: Year, CONTACTCONTENT2: contactcontent2, MAIL: mail })
})
app.get("/about", function(req, res) {
    res.render("About", { ABOUTCONTENT: AboutContent, DATE: Year })
})

app.get("/compose", function(req, res) {
    res.render("Compose", { DATE: Year })
})

app.get("/posts/:postName", function(req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);
    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);
        if (requestedTitle === storedTitle) {
            //res.render("SpecificPost", { TITLE: post.title, CONTENT: post.content }); 
            res.render("sample", { TITLE: post.title, CONTENT: post.content });

        }
    })
})


//post Routing 

app.post("/publish", function(req, res) {
    const postTitle = req.body.POSTTITLE;
    const postBody = req.body.POSTBODY;
    const d = new Date();
    const post = {
        title: postTitle,
        content: postBody,
        date: d
    }
    posts.push(post);
    res.redirect("/home");

});















app.listen(3000, function(req, res) {
    console.log("Server Started and Listening at 3000 port");
});