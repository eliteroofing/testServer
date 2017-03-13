var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var structure = new Schema({
    firstname: { type: String, default: null},
    lastname: { type: String, default: null},
    emails: { type: String, default: null},
    phone: { type: String, default: null},
    skills: [{ 
        name: { type: String, default: null}
     }]
});

var model = mongoose.model('Teacher',structure);

module.exports = model;