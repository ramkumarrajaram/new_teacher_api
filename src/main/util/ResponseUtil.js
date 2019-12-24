export default class ResponseUtil {
    constructor() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.message = null;
    }

    setSuccess(statusCode, message, data) {
        this.statusCode = statusCode;
        this.data = data;
        this.type = 'success';
    }

    setError(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.type = 'error';
    }

    send(res) {
        let result;
        if (this.type === 'success') {
            result = {
                data: this.data
            }
        } else {
            result = {
                status: this.type,
                message: this.message,
                data: this.data,
            };
        }

        return this.setResponse(res, result);
    }

    setResponse(res, result) {
        return res.status(this.statusCode).json(result);
    }

    sendCommonStudents(res) {
        const result = {
            students: this.data
        }

        return this.setResponse(res, result);
    }

    sendNotification(res) {
        const result = {
            recipients: this.data
        }

        return this.setResponse(res, result);
    }
}