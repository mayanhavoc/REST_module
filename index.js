const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');
uuid();


// **********
// MIDDLEWARE
// **********
// Because POST data can contain any type of data, the default response in express for 'req.body' is 'undefined'. 
// In order to access the data in the body, we must use middleware such as 'express.json' and 'express.urlencoded'   
// This middleware parses any data coming from a form POST request 
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

// Set ABSOLUTE path for views folder 
app.set('views',path.join(__dirname, 'views'))

// include ejs
app.set('view engine', 'ejs')


let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'onlysaywoof',
        comment: 'woof woof woof' 
    },
]

// We'll follow a pattern to implement a REST API (this is not the only way to do it).
// We're going to set up 'path' to the same name as our 'resource' BUT pluralized (e.g. '/comments'). This will be our base for everything we do.

// *****************************************************
// INDEX ROUTE
// GET /comments -> Then we'll have different HTTP verbs (GET, POST, etc), and if you send a 'GET' request to '/comments' will show ALL comments
// *****************************************************
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})


// *****************************************************
// NEW - renders a form
// *****************************************************
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})


// *****************************************************
// CREATE ROUTE
// POST /comments -> The same path, but POST request, is how we'll CREATE a new comment
// we need a route to render the form, often we call that the 'new' route.
// *****************************************************
// Once you submit the form, it's submitted as a POST request
app.post('/comments', (req, res)=> {
    // destructuring the data from the body of the request
    const { username, comment } = req.body;
    comments.push({username, comment, id: uuid() })
    // by specifying a path and using the 'redirect' method, the response that's generated status code (the default is 302), and then the response will also include this path under the location header, which the browser will then use to automatically and quickly make a 'GET' request to '/comments'.
     res.redirect('/comments');
})


// *****************************************************
// SHOW ROUTE (information about one particular resource, usually in expanded view)  
// GET /comments/:id -> To get one comment in particular, we'll use a GET req and an ':id'. This path will refer to 1 comment. Every comment needs to have some identifier, usually when we work within a DB we'll have some identifier. 
// *****************************************************
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

// *****************************************************
//EDIT ROUTE: Form to edit a specific comment
app.get('/comments/:id/edit', (req, res) => {
    // get the id
    const { id } = req.params;
    // find the comment based on the id
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})
// *****************************************************


// *****************************************************
// UPDATE ROUTE
// PUT vs PATCH: A 'PUT' request will completely update the resource. It will take whatever payload is included in the request and replace the representation completely. While the 'PATCH' request will partially modify the resource. 
// PATCH /comments/:id -> Updates one comment
// *****************************************************
app.patch('/comments/:id', (req, res) => {
    // To update a comment we need to
    // Grab the id: 
    const { id } = req.params;
    // Grab the payload from the input
    const newCommentText = req.body.comment;
    // Find the comment with that id: 
    const foundComment = comments.find(c => c.id === id);
    // Update the comment based on the payload sent in the req.body
    foundComment.comment = newCommentText;
    // Redirect
    res.redirect('/comments');
})

// *****************************************************
// DELETE/DESTROY ROUTE
// DELETE /comments/:id -> Destroy one comment
// *****************************************************
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    // To REMOVE the comment from the array, we'll use the 'filter' method
    // We want every object that does not have the id
    // Might seem overkill to create a whole new array, but it's best practice NOT to mutate objects/arrays but instead copy them
    comments =  comments.filter(c => c.id !== id)
    res.redirect('/comments');
})




app.get('/tacos', (req, res)=> {res.send("Get /tacos response")})

app.post('/tacos', (req, res) => {
    const { meat, qty } = (req.body)
    res.send(`Please confirm your order of ${qty} ${meat} tacos`)
})

app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})









