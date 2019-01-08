var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DoctorSchema   = new Schema({
    availabilityDays: {
        type: Array,
        required:true
    },
    availabilityTime: {
        type: String,
        required:true
    },
    availabilityHours: {
        type: Number,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Doctor', DoctorSchema);