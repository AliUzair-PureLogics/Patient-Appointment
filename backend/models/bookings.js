var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookingSchema   = new Schema({
    patientName: {
        type: string,
        required:true
    },
    appointmentTime: {
        type: Date,
        required:true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Booking', BookingSchema);