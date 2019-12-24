import registerStudentsService from '../services/RegisterStudentsService';
import ResponseUtil from "../util/ResponseUtil";
import InvalidInputError from '../error/InvalidInputError'

const responseUtil = new ResponseUtil();

class RegisterStudentsController {

    static async registerStudents(req, res) {

        try {
            let teacher = req.body.teacher;
            let students = req.body.students;
            await registerStudentsService.registerStudents(teacher, students);
            responseUtil.setSuccess(204, "Success", null);
            responseUtil.send(res);
        } catch(exception) {
            if(exception instanceof InvalidInputError) {
                responseUtil.setError(exception.status, exception.message);
                responseUtil.send(res);
            } else {
                responseUtil.setError(500, exception.message);
                responseUtil.send(res);
            }
        }
    }
}
export default RegisterStudentsController;