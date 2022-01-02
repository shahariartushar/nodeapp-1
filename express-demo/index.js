const express = require('express');
const app = express();

app.use(express.json());

//courses
const courses =[
    { id: 1, name: 'KTR'},
    { id: 2, name: 'DSAM'},
    { id: 3, name: 'PSI'}
];


app.get('/', (req, res)=>{
    res.send('Hello World!!');
});

//get /api/courses
app.get('/api/courses', (req, res)=>{
    res.send(courses);
});

//get /api/courses/1
app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) res.status(404).send('Course Id not found');
    res.send(course);
});

//post /api/courses
app.post('/api/courses', (req, res)=>{
    const course =  {
        id: courses.length + 1,
        name: req.body.name

    };
    courses.push(course);
    res.send(course);
});


//multiple params /api/year/month
app.get('/api/:year/:month', (req, res)=>{
    res.send(req.params);
});

// /api/year/month?sortBy=name
app.get('/api/:year/:month', (req, res)=>{
    res.send(req.query);
});


//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
