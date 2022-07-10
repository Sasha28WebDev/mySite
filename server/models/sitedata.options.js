const AdminBro = require('admin-bro')
const { SiteData } = require('./data')

const {
    after: uploadAfterHook,
    before: uploadBeforeHook,
} = require('./actions/upload-image.hook');

const {
    after: passwordAfterHook,
    before: passwordBeforeHook,
} = require('./actions/password.hook');
const { request } = require('express');

const options = {
    properties: {
        /* dashboard: {
            component: AdminBro.bundle('./components/my-dashboard-component')
        }, */
        uploadImage: {
            components: {
                edit: AdminBro.bundle('./components/upload-image.edit.jsx')
            }
        },
    },
    actions: {
        new: {
            after: async (response, request, context) => {
                const modifiedResponce = await passwordAfterHook(response, request, context)
                console.log('after')
                return uploadAfterHook(request, modifiedResponce, context)
            },
            before: async (request, context) => {
                const modifiedRequest = await passwordBeforeHook(request, context)
                console.log('before')
                return uploadBeforeHook(modifiedRequest, context)
            },
        },
       /*  edit: {
            after: async (response, request, context) => {
                const modifiedResponce = await passwordAfterHook(response, request, context)
                console.log('after')
                return uploadAfterHook(request, modifiedResponce, context)
            },
            before: async (request, context) => {
                const modifiedRequest = await passwordBeforeHook(request, context)
                console.log('before')
                return uploadBeforeHook(modifiedRequest, context)
            },
        }, */
    }
}


module.exports = {
    options,
    resource: SiteData,
}
