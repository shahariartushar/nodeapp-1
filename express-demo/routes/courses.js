const express = require("express");
const router = express.Router();

//courses
const courses = [
  { id: 1, name: "KTR" },
  { id: 2, name: "DSAM" },
  { id: 3, name: "PSI" },
];

//get /api/courses
router.get("/", (req, res) => {
  res.send(courses);
});

//get /api/courses/1
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course Id not found");

  res.send(course);
});

//post /api/courses
router.post("/", (req, res) => {
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

  const { error } = validateCourse(req.body); //result error
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  res.send(course);
});

//put /api/courses
router.put("/:id", (req, res) => {
  //look up the course
  //if not exists, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course Id not found");

  //valdiate
  //if invalid, return 400
  const { error } = validateCourse(req.body); //result error
  if (error) return res.status(400).send(error.details[0].message);

  //update the course
  course.name = req.body.name;
  //retur the updated the course
  res.send(course);
});

router.delete("/:id", (req, res) => {
  //look up the course
  //if not exists, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course Id not found");

  //delete the course
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  //return the updated the course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

module.exports = router;
