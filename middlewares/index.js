

const  validateFields  = require('../middlewares/validate_fields');
const  validateJWT  = require('../middlewares/validate_JWT');
const  validateRoles  = require('../middlewares/validate_roles');
const  validateUploads  = require('../middlewares/validate_uploads');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateUploads
}

