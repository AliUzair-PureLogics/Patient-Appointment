var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// Roles
// admin: 1, patient: 2, doctor: 3

var UserSchema   = new Schema({
    name: {
        type: String
    },
    role: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);