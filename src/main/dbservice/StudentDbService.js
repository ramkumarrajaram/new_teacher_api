import model from "../../../models";
import InvalidInputError from "../error/InvalidInputError";
import {where} from "sequelize";

const {Student, Teacher} = model;
const {TeacherStudent} = model.sequelize.models;

class StudentDbService {

    static async findStudentWithEmailAndTeacherId(studentEmailList, teacherId) {
        try {
            return Student.findAll({
                include: [{
                    model: Teacher
                }],
                where: {
                    email: studentEmailList,
                    '$TeacherId$': teacherId
                }
            });
        } catch (error) {
            throw new InvalidInputError(500, error);
        }
    }

    static async getStudentsFromEmail(studentEmailList) {
        try {
            return  Student.findAll({
                where: { email: studentEmailList }
            });
        } catch (error) {
            throw new InvalidInputError(500, error);
        }
    }

    static async registerStudentsWithTeacher(studentEmailList, teacherId) {
        const teacherStudentArray = studentEmailList.map(student =>
            ({
                TeacherId: teacherId,
                StudentId: student.id
            })
        );
        TeacherStudent.bulkCreate(teacherStudentArray);
    }

    static async findCommonStudents(teacherEmailList) {
        try {
            let count = Student
                .count({
                    group: [ 'Student.email' ],
                    having: model.sequelize.literal(`count(*) = ${teacherEmailList.length}`),
                    include: [
                        {
                            model: Teacher
                        }
                    ],
                    where: { '$Teachers.email$': teacherEmailList }
                });
            return count;
        } catch (error) {
            throw new InvalidInputError(500, error);
        }
    }

    static async findStudentWithEmailAddress(email) {
        try {
           return Student.findOne({
                where: {email: email}
            })
        } catch (error) {
            throw error;
        }
    }

    static async suspendStudent(student) {
        try {
            student
                .update(
                    {suspend: true});
        } catch (error) {
            throw error;
        }
    }

    static async findNonSuspendedStudentsOfTeacher(teacherEmail) {
        try {
            return Student.findAll({
                attributes: ['email'],
                include: [{
                    model: Teacher
                }],
                where: {
                    suspend: false,
                    '$Teachers.email$': teacherEmail
                }
            });
        } catch (error) {
            throw error;
        }
    }
}

export default StudentDbService;