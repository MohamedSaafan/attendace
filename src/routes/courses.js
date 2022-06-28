const { default: axios } = require("axios");
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

router.get("/courses/:instructorID", async (req, res, next) => {
  const { instructorID } = req.params;
  // COURSE NAME
  // COURSE CODE
  // NUMBER OF STUDENTS
  // LINKED AT
  // DATE CREATED
  const getCoursesQuery = await pool.query(
    `
  SELECT courses.course_id, courses.name,courses.start_date
  FROM courses  where  instructor_id = $1
  `,
    [instructorID]
  );
  const courses = getCoursesQuery.rows;
  for (let i = 0; i < courses.length; i++) {
    const courseID = courses[i].course_id;
    const countStudentsQuery = await pool.query(
      `SELECT count(*) as "number_of_students" FROM enrollements WHERE course_id = $1`,
      [courseID]
    );
    courses[i].number_of_students =
      countStudentsQuery.rows[0].number_of_students;
  }
  res.status(200).send(courses);
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

const takeAttendance = async (faces, lectureImageURL) => {
  const { data } = await axios.post();
};

router.post("/:courseID/take-attendance", async (req, res, next) => {
  // get the lecture image
  // get students array of images
  // call the function to take the attendance
  // mark attendees as attended the lecture
  const { courseID } = req.params;
  const { lectureImageURL } = req.body;
  console.log(courseID, lectureImageURL, "from courseID and lectureImage url");
  const studentsFaces = await getStudentsImages(courseID);
  console.log(studentsFaces, "from students faces");
  const response = await axios.post("http://zalapya.ddns.net/addimg", {
    imgs: [lectureImageURL],
    faces: studentsFaces,
  });

  console.log(response.data, "from response of the attendance");

  // const studentsCodesArray = attendedStudentsCodes.resFaces;
  // for (let i = 0; i < studentsCodesArray.length; i++) {
  //   // mark each student as attended in the course
  //   await pool.query(
  //     `
  //     INSERT INTO attendance (student_id,date,course_id) VALUES ($1,now(),$2)
  //   `,
  //     [studentsCodesArray[i], courseID]
  //   );
  // }
  res.status(200).send({ message: "Attendance Taken Successfully" });
  // {
  //   "resFaces":["fac1Name","face2Name"]
  // }
});

router.get("/courses/:courseID/attendance-report", async (req, res, next) => {
  const { courseID } = req.params;
  const reportQuery = await pool.query(
    `
    select students.name,students.id as "student_code",count(attendance.student_id) as "num_of_attendance" from students join attendance on attendance.student_id = students.id
    group by students.name, attendance.course_id, students.id
    having attendance.course_id = $1
  `,
    [courseID]
  );
  res.status(200).send(reportQuery.rows);
});

// an instructor token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY1MzE1NTg4OX0._rC6N-6i1rjVDqyVpqu0Yi1-eJAfmUdX3e3PwcYdc6c

module.exports = router;
