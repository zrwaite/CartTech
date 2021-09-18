module.exports = class response {
    constructor(status=400, errors=[], response={}, connected=false, success=false) {
        this.success = success;
        this.connected = connected;
        this.status = status;
        this.errors = [];
        this.errors.push(...errors);
        this.response = response;
    }
}