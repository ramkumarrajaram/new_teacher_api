import studentDbService from "../dbservice/StudentDbService";
import InvalidInputError from "../error/InvalidInputError";
import ValidationUtil from "../util/ValidationUtil";

const validationUtil = new ValidationUtil();

class SuspendStudentService {
    static async suspendStudent(student) {
        SuspendStudentService.validateEmailAddress(student);
        try {
            let studentFromDatabase = await studentDbService.findStudentWithEmailAddress(student);
            if(studentFromDatabase === null || studentFromDatabase === undefined) {
                throw new InvalidInputError(422, "Email address not present in the database");
            }

            if(studentFromDatabase.suspend === true) {
                throw new InvalidInputError(422, "Student already suspended");
            }
            await studentDbService.suspendStudent(studentFromDatabase);
        } catch (error) {
            throw error;
        }
    }

    static validateEmailAddress(student) {
        if(student === null || student === undefined) {
            throw new InvalidInputError(422, "Email address of the student is not present");
        }

        if(validationUtil.isNotValidEmail(student)) {
            throw new InvalidInputError(422, "Email address entered is not valid");
        }
    }
}

export default SuspendStudentService;