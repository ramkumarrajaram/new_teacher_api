import model from "../../../models";
import InvalidInputError from "../error/InvalidInputError";

const {Student, Teacher} = model;

class TeacherDbService {

    static async findTeacherByEmail(emailId) {
        try {
           return  await Teacher.findOne({
                where: {email: emailId}
            });
        } catch (exception) {
            throw new InvalidInputError(422, `Teacher entry for email address - ${emailId} not found. Please make an entry of the teacher in database`);
        }
    }
}

export default TeacherDbService;