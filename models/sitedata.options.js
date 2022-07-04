const AdminBro = require('admin-bro')
const { SiteData } = require('./data')




const options = {
    properties: {
        
        about: {
            type: 'textarea',
        },
    },
    
};

module.exports = {
    options,
    resource: User,
}
