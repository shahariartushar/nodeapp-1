const Joi = require('joi');
const logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled...');
}


app.use(logger);

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//courses
const courses =[
    { id: 1, name: 'KTR'},
    { id: 2, name: 'DSAM'},
    { id: 3, name: 'PSI'}
];

//get /api/courses
app.get('/api/courses', (req, res)=>{
    res.send(courses);
});

//get /api/courses/1
app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)    return res.status(404).send('Course Id not found');
    
    res.send(course);
});

//post /api/courses
app.post('/api/courses', (req, res)=>{
    
    /* //now it will come from validdateCourse function
    const schema = Joi.object({ //joi.object for newer version of JOI
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body); //schema.validate for newer version of JOI

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    */

    
    const {error} = validateCourse(req.body); //result error
    if(error)   return  res.status(400).send(error.details[0].message);

    const course =  {
        id: courses.length + 1,
        name: req.body.name

    };
    courses.push(course);
    
    res.send(course);
});

//put /api/courses
app.put('/api/courses/:id', (req, res)=>{
    //look up the course
    //if not exists, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)    return res.status(404).send('Course Id not found');

    //valdiate
    //if invalid, return 400
    const {error} = validateCourse(req.body); //result error
    if(error)   return res.status(400).send(error.details[0].message);


    //update the course
    course.name = req.body.name;
    //retur the updated the course
    res.send(course);
});

app.delete('/api/courses/:id', (req, res)=>{
    //look up the course
    //if not exists, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)    return res.status(404).send('Course Id not found');

    //delete the course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return the updated the course
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    
    return  Joi.validate(course, schema);
}


//multiple params /api/year/month
app.get('/api/:year/:month', (req, res)=>{
    res.send(req.params);//test message
});

// /api/year/month?sortBy=name
app.get('/api/:year/:month', (req, res)=>{
    res.send(req.query);
});



