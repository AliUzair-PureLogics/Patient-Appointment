var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookingSchema   = new Schema({

    availabilityDate: {
        type: Date,
        required:true
    },
    availabilityDay: {
        type: String,
        required:true
    },
    availabilityTime: {
        type: String,
        required:true
    },
    doctorId: { type: Schema.Types.ObjectId, ref: 'User' },
    patientId: { type: Schema.Types.ObjectId, ref: 'User' },
    availabilityDateFormatted:String,
});

module.exports = mongoose.model('Booking', BookingSchema);