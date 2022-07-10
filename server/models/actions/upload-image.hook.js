const path = require('path')
const fs = require('fs')
const AdminBro = require('admin-bro');
const after = async (response,request, context) => {
    const { record, uploadImage } = context
    if (record.isValid() && uploadImage) {
        const filePath = path.join('uploads',record.param('nickName').toString(), uploadImage.name);
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.copyFile(uploadImage.path,filePath);
        const profilePhotoLocation = { profilePhotoLocation: `/${filePath}` }

       // console.log(record.params._id.parse)
       // await record.save({_i : '1'});
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
