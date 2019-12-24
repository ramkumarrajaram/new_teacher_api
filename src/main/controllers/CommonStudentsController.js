import commonStudentsService from '../services/CommonStudentsService';
import ResponseUtil from '../util/ResponseUtil'
import InvalidInputError from "../error/InvalidInputError";

const responseUtil = new ResponseUtil();

class CommonStudentsController {
    static async getCommonStudents(req, res) {
        try {
            let teacher = req.query.teacher;

            let students = await commonStudentsService.getCommonStudents(teacher);
            responseUtil.setSuccess(200, "Success", students);
            responseUtil.sendCommonStudents(res);
        } catch (exception) {
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
export default CommonStudentsController;