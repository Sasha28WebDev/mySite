const path = require('path')
const fs = require('fs')
const AdminBro = require('admin-bro');





const after = async (response,request, context) => {
    const { record, uploadImage } = context
    if (record.isValid() && uploadImage) {
       
        const filePath = path.join('uploads',record.param('nickName').toString(), uploadImage.name);
        //console.log(record.param('nickName').toString())
        //console.log(record.param('nickName'))
        //console.log(record)
        //const _id = record.id().toString()
        //console.log(_id)
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        //console.log('first')
        await fs.promises.copyFile(uploadImage.path, path.join('static',filePath));
        //console.log('second')
        const profilePhotoLocation = { profilePhotoLocation: `/${filePath}` }
        await record.save({_i : '1'});
        console.log(record)
        //console.log('third')
        //console.log(response)
    }
    return response;
}

const before = async (request, context) => {
    if (request.method === 'post') {
        const { uploadImage, ...otherParams } = request.payload;

        // eslint-disable-next-line no-param-reassign
        context.uploadImage = uploadImage;

        return {
            ...request,
            payload: otherParams,
        };
    }
    return request;
};
module.exports = { after, before };
