const { default: AdminBro } = require('admin-bro')
const AdminBroMongoose = require('admin-bro-mongoose')

AdminBro.registerAdapter(AdminBroMongoose);
const AdminUser = require('../models/user.options')

const AdminSiteData = require('../models/sitedata.options')
const {SiteData} = require('../models/data')
/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [AdminUser,AdminSiteData],//AdminSiteData
};

module.exports = options;
