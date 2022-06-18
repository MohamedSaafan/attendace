import pool from "../config/db_production";

export const takeAttendance = async (lectureImageURL, courseID) => {
  // get the urls of all the students
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

  // send a request to  Emad's function
};
