const AdminBro = require('admin-bro')
const { User } = require('./data')

const {
    after: passwordAfterHook,
    before: passwordBeforeHook,
} = require('./actions/password.hook');


const options = {
    properties: {
        encryptedPassword: {
            isVisible: true,
        },
        password: {
            type: 'password',
        },
    },
    actions: {
        new: {
            after: passwordAfterHook,
            before: passwordBeforeHook,
        },
        edit: {
            after: passwordAfterHook,
            before: passwordBeforeHook,
        },
    },
};

module.exports = {
    options,
    resource: User,
}
