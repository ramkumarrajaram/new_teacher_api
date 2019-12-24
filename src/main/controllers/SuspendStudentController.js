import suspendStudentService from '../services/SuspendStudentService';
import InvalidInputError from "../error/InvalidInputError";
import ResponseUtil from "../util/ResponseUtil";

const responseUtil = new ResponseUtil();
class SuspendStudentController {
    static async suspendStudent(req, res) {

        try {
            let student = req.body.student;
            await suspendStudentService.suspendStudent(student);
            responseUtil.setSuccess(204, 'successs', null);
            responseUtil.send(res);
        } catch (error) {
            if(error instanceof InvalidInputError) {
                responseUtil.setError(422, error.message);
                responseUtil.send(res);
            } else {
                responseUtil.setError(500, error.message);
                responseUtil.send(res);
            }
        }
    }
}
export default SuspendStudentController;