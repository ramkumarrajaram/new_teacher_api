import ValidationUtil from '../util/ValidationUtil'
import InvalidInputError from "../error/InvalidInputError";
import teacherDbService from "../dbservice/TeacherDbService";
import studentDbService from "../dbservice/StudentDbService";
import {union} from "lodash";

const validationUtil = new ValidationUtil();

class RetrieveNotificationService {
    static async retrieveNotification(teacherEmailAddress, notification) {
        if (teacherEmailAddress === null || teacherEmailAddress === undefined
            || validationUtil.isNotValidEmail(teacherEmailAddress)) {
            throw new InvalidInputError(422, "Please enter a valid email address");
        }
        try {
            let teacherFromDatabase = await teacherDbService.findTeacherByEmail(teacherEmailAddress);

            if (teacherFromDatabase === null || teacherFromDatabase === undefined) {
                throw new InvalidInputError(422, "Teacher Email address not present");
            }

            let studentsFromDb = await studentDbService.findNonSuspendedStudentsOfTeacher(teacherEmailAddress);
            let registeredStudents = studentsFromDb.map(student => student.email);
            return this.combineStudentsForNotification(notification, registeredStudents);
        } catch (error) {
            throw error;
        }
    }


    static combineStudentsForNotification(notification, registeredStudents) {
        if (notification !== null && notification !== undefined) {
            let nonRegisteredStudents = notification.split(' ')
                .filter(word => word.startsWith('@'))
                .map(email => email.substr(1));
            return union(registeredStudents, nonRegisteredStudents);
        }

        return registeredStudents;
    }
}

export default RetrieveNotificationService;