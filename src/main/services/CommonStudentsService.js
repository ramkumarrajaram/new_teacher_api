import ValidationUtil from '../util/ValidationUtil'
import ResponseUtil from "../util/ResponseUtil";
import commonStudentsValidationService from "./CommonStudentsValidationService";
import studentDbService from "../dbservice/StudentDbService";
import InvalidInputError from "../error/InvalidInputError";
import {convertToArray} from "../util/CommonUtil";

class CommonStudentsService {
    static async getCommonStudents(teacher) {
        let validEmail = commonStudentsValidationService.validateTeacher(teacher);

        if(validEmail !== true) {
            throw new InvalidInputError(422, "Email address is invalid. Please enter a valid email address");
        }

        let students = await studentDbService.findCommonStudents(convertToArray(teacher));
        
        let studentEmailList = [];
        students.forEach(function(item) {
            studentEmailList.push(item.email);
        });

        return studentEmailList;
    }
}

export default CommonStudentsService;