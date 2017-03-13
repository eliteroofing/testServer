var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skills = new Schema({
    name: { type: String, default: null}
});

var model = mongoose.model('Skill', skills);

module.exports = model;