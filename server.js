const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


//middleware section
app.use(bodyParser.json());
app.use(cors());

//database
const database = {
    users: [
        {
        id: '123',
        name: 'tony',
        email: 'tonyemail@gmail.com',
        entries: 0,
        password: 'orange',
        joined: new Date()

    },
    {
        id: '321',
        name: 'jonnie',
        email: 'jonnieemail@gmail.com',
        entries: 0,
        password:'apple',
        joined: new Date()

    },
]
}


//Basic root route just to test code
app.get('/', (req, res)=>{
    
    res.json(database.users);
})

//checking my database for a email and password that matching the POST request recieved 
app.post('/signin',(req, res) =>{
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');
    }else{
        res.status(400).json('error logging in');
    }
})

//if this succeeds a new user will be created 
//so ill be grabbing the req.body and passing the info to the database
app.post('/register', (req, res) => {
    //destructuored the request 
    const {email,name, password} = req.body 
    database.users.push({
        id: '555',
        name: name,
        email: email,
        entries: 0,
        password: password,
        joined: new Date()

    })

    res.json(database.users[database.users.length -1])
})

app.get('/profile/:id', (req,res)=> {
    const {id} = req.params;
    database.users.forEach(user => {
        let found = false;
        if(user.id === id){
            found = true;
            return res.json(user);
        }
        if(!found){
           res.status(404).json('no user found'); 
        } 
    })
})

// app.put('/image', (req,res)=> {
//     const {id} = req.body;
//     database.users.forEach(user => {
//         let found = false;
//         if(user.id === id){
//             found = true;
//             user.entries ++;
//             return res.json(user.entries);
//         }
//         if(!found){
//            res.status(404).json('no user found'); 
//         } 
// })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

//planning api design
//each of the below are endpoints to be created
/*
   / -> responds with this is working
   /signin -> POST -> success or fail 
   /register -> POST -> new created user object
   /profile/user:id -> GET -> user
   /image -> PUT  -> updated user object 
*/