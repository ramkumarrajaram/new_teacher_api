import InvalidInputError from '../error/InvalidInputError';
import teacherDbService from '../dbservice/TeacherDbService';
import studentDbService from '../dbservice/StudentDbService';
import registerStudentsValidationService from './RegisterStudentsValidationService';

class RegisterStudentsService {
    static async registerStudents(teacher, students) {
        if( !registerStudentsValidationService.validateTeacherAndStudentEmailAddresses(teacher, students)) {
            throw new InvalidInputError(422, "One or more of the email address / addresses sent is / are invalid");
        }

        try {

            let teacherModel = await teacherDbService.findTeacherByEmail(teacher);

            if (teacherModel) {

                let studentsListFromDB = await studentDbService.getStudentsFromEmail(students);
                if(!registerStudentsValidationService.findIfStudentsArePresent(students, studentsListFromDB)){
                    throw new InvalidInputError(422, "One or more of the email address / addresses is / are not present in database");
                }

                let studentEmails = await studentDbService.findStudentWithEmailAndTeacherId(students, teacherModel.id);
                if(!registerStudentsValidationService.isStudentNotRegistered(studentEmails)) {
                    throw new InvalidInputError(422, "One or more of the email address / addresses is / are already registered with the teacher");
                }

                await studentDbService.registerStudentsWithTeacher(studentsListFromDB, teacherModel.id);
            } else {
                throw new InvalidInputError(422, `Teacher Email address ${teacher} doesn't exist in database`);
            }
        } catch (error) {
            throw error;
        }
    }
}

export default RegisterStudentsService;