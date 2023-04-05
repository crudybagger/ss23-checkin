const mongoose = require('mongoose')
const Schema = mongoose.Schema


const RegisterSchema = new Schema({
    uniqueId : {
        type:String,
        required : true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required : true
    },
    mobile : {
        type : String,
        required: false,
        default : "0"
    },
    college : {
        type: String,
        required: false,
        default : "0"
    },
    gender : {
        type: String,
        required: false
    },
    level : {
        type : String,
        required: false
    },
    isAdmin : {
        type: Number,
        default: 0
    },
    referralCount : {
        type: Number,
        default: 0
    },

    //reg no. of the student who referred
    referralId : {
        type:String,
        required : false
    },

    //changed to boolean
    paidForInaugural : {
        type: Number,
        default: 0
    }, 

    paidForRegDay1 : {
        type: Number,
        default: 0
    }, 
     paidForRegDay2 : {
        type: Number,
        default: 0
    }, 
     paidForRegDay3 : {
        type: Number,
        default: 0
    }, 
    paidForAccomodationDay0 : {
        type: Number,
        default: 0
    },
    paidForAccomodationDay1 : {
        type: Number,
        default: 0
    }, 
     paidForAccomodationDay2 : {
        type: Number,
        default: 0
    }, 
     paidForAccomodationDay3 : {
        type: Number,
        default: 0
    },
    paidForProshow1 : {
        type: Number,
        default: 0
    },
    paidForProshow2 : {
        type: Number,
        default: 0
    },
    paidForProshow3 : {
        type: Number,
        default: 0
    },
    wishlist : {
      type: Array,
      default: [],
    },
    events : {
      type: Array,
      default: [],
    },
    ended : {
      type: Array,
      default: [],
    },
    codes : {
        type: Array,
        default: [],
    }
},
{ timestamps: true }
)



module.exports = mongoose.model('registration', RegisterSchema)