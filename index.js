const express = require('express');
const app = express();

// Because POST data can contain any type of data, the default response in express for 'req.body' is 'undefined'. 
// In order to access the data in the body, we must use middleware such as 'express.json' and 'express.urlencoded'   

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/tacos', (req, res)=> {res.send("Get /tacos response")})

app.post('/tacos', (req, res) => {
    const { meat, qty } = (req.body)
    res.send(`Please confirm your order of ${qty} ${meat} tacos`)
})

app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})