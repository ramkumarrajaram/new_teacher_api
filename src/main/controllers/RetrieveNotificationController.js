import retrieveNotificationService from '../services/RetrieveNotificationService';
import ResponseUtil from "../util/ResponseUtil";
import InvalidInputError from "../error/InvalidInputError";
const responseUtil = new ResponseUtil();
class RetrieveNotificationController {
    static async retrieveNotification(req, res) {
        try {
            let teacherEmailAddress = req.body.teacher;
            let notification = req.body.notification;
            let combinedStudents = await retrieveNotificationService
                .retrieveNotification(teacherEmailAddress, notification);
            responseUtil.setSuccess(200, 'success', combinedStudents);
            responseUtil.sendNotification(res);
        } catch (error) {
            if(error instanceof InvalidInputError) {
                responseUtil.setError(error.status, error.message);
                responseUtil.send(res);
            } else {
                responseUtil.setError(500, error.message);
                responseUtil.send(res);
            }
        }
    }

}

export default RetrieveNotificationController;