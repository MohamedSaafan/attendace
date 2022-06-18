const pool = require("../config/db");

const router = new require("express").Router();
const handleAuthentication = require("../middlewares/handleAuthentication");

router.post("/courses", handleAuthentication, async (req, res, next) => {
  // extract your paramters:- name,instructorName,startDate,endDate
  // extract your session times and dates and months
  // make a cron-job to run automatically and take the attendance
  if (!req.user.isInstructor)
    return res.status(401).send({ message: "User is UnAuthorized" });
  const instructorID = req.user.id + "";
  const { name, startDate, endDate, courseID } = req.body;
  // check if the course is registered with the name;

  if (!name || !startDate || !endDate) {
    return res.status(400).send({ message: "In Complete Parameters" });
  }
  const findCourseQuery = await pool.query(
    `SELECT * FROM courses where course_id = $1`,
    [courseID]
  );
  if (findCourseQuery.rowCount)
    return res.status(400).send({ message: "Course Already Registered" });
  console.log("after findCourses query");
  const addCourseQuery = await pool.query(
    `INSERT INTO courses (
      course_id,
      name,
      instructor_id,
      start_date,
      end_date
      ) VALUES (
        $1,$2, $3 ,$4,$5 
      )`,
    [courseID, name, instructorID, new Date(startDate), new Date(endDate)]
  );
  return res.status(201).send({ message: "Course Created Successfully" });
});

router.post(
  "/students/courses/enroll",
  handleAuthentication,
  async (req, res, next) => {
    if (req.user.isInstructor)
      return res.status(405).send({ message: "Operation Not Allowed" });
    // get the id of the student
    const studentID = req.user.id;
    const { courseID } = req.body;

    // check if the user enrolled in the course before or not
    const findEnrollement = pool.query(
      `SELECT * FROM enrollements WHERE student_id = $1 AND course_id  = $2 `,
      [studentID, courseID]
    );

    if (findEnrollement.rowCount)
      return res.status(400).send({ message: "Student Already Enrolled" });
    // now the user isn't enrolled
    // let's enroll him!

    const enrollUserQuery = await pool.query(
      `INSERT INTO enrollements (
      course_id,
      student_id
    ) VALUES (
      $1,
      $2
    )`,
      [courseID, studentID]
    );
    res.status(201).send({ message: "Student Enrolled Successfully" });
  }
);

const getStudentsImages = async (courseID) => {
  const getFacesQuery = await pool.query(
    `
      SELECT students.id as "student_id" , students.image_url 
      FROM students JOIN enrollements ON enrollements.student_id = students.id
      WHERE enrollements.course_id = $1
    `,
    [courseID]
  );
  const faces = {};
  getFacesQuery.rows.forEach((student) => {
    faces["1-" + student.student_id] = student.image_url;
  });

  return faces;
};
const takeAttendance = async (faces, lectureImageURL) => {};
router.post("/:courseID/take-attendance", async (req, res, next) => {
  // get the lecture image
  // get students array of images
  // call the function to take the attendance
  // mark attendees as attended the lecture
  const { courseID } = req.params;
  const { lectureImageURL } = req.body;
  const studentsFaces = await getStudentsImages(courseID);
  const attendedStudentsCodes = await takeAttendance();
  const studentsCodesArray = attendedStudentsCodes.resFaces;
  for (let i = 0; i < studentsCodesArray.length; i++) {
    // mark each student as attended in the course
    await pool.query(
      `
      INSERT INTO attendance (student_id,date,course_id) VALUES ($1,now(),$2)
    `,
      [studentsCodesArray[i], courseID]
    );
  }

  // {
  //   "resFaces":["fac1Name","face2Name"]
  // }
});

router.post("/:courseID/attendance-report", async (req, res, next) => {
  const reportQuery = await pool.query(``);
});

// an instructor token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY1MzE1NTg4OX0._rC6N-6i1rjVDqyVpqu0Yi1-eJAfmUdX3e3PwcYdc6c

module.exports = router;
