const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckinSchema = new Schema({
    uniqueId: {
        type: String,
        required: true,
    },
    checkedIN: {
        type: Boolean,
        default: false,
    }
});

const Checkin = mongoose.model("Checkin", CheckinSchema);

module.exports = Checkin;
