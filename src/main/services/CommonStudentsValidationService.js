import ValidationUtil from '../util/ValidationUtil'
import InvalidInputError from "../error/InvalidInputError";
import {convertToArray} from "../util/CommonUtil";

const validationUtil = new ValidationUtil();

class CommonStudentsValidationService {

    static validateTeacher(teacher) {
        if (teacher === null || teacher === undefined) {
            return false;
        }

        let teacherList = convertToArray(teacher);
        let filter = teacherList.filter(teacher => validationUtil.isNotValidEmail(teacher));

        if (filter.length !==0 ) {
            return false;
        }

        return true;
    }
}

export default CommonStudentsValidationService;