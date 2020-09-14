const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Halow");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// GET by ID
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(
    (apapun) => apapun.id === parseInt(req.params.id)
  );

  if (!course) {
    // 404
    res.status(404).send("The course with the given ID was not found");
  }
  res.send(course);
});

// POST
app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    // 400 Bad Request
    res.status(400).send("Name is requires dan minimal 3 huruf");
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on PORT ${port}`));
