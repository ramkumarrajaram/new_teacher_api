import InvalidInputError from "../error/InvalidInputError";

import ValidationUtil from '../util/ValidationUtil';
const validationUtil = new ValidationUtil();

class RegisterStudentsValidationService {
    static validateTeacherAndStudentEmailAddresses(email, students) {
        if (validationUtil.isNotValidEmail(email)) {
            return false;
        }

        return validationUtil.isValidEmailInArray(students);
    }

    static validateEmail(email) {
        return !validationUtil.isNotValidEmail(email);
    }

    static findIfStudentsArePresent(emailList, emailListFromDb) {
        return emailList.length === emailListFromDb.length;
    }

    static isStudentNotRegistered(studentEmails) {
        return studentEmails.length===0;
    }
}

export default RegisterStudentsValidationService;