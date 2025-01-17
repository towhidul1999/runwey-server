const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('dotenv').config()

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'Name is must be given'] },
  dateOfBirth: { type: String, required: false },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: false },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: [true, 'Email should be unique'],
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
      },
      message: 'Please enter a valid Email'
    }
  },
  role: { type: String, enum: ['user','admin', 'creator', 'pendingCreator'], default: 'user' },
  contentStatus: { type: String, enum: ['pending', 'accepted', 'rejected','unknow'], default: 'unknow' },
  phoneNumber: { type: String, required: false },
  countryCode: { type: String, required: false },
  password: { 
    type: String, 
    required: [true, 'Password must be given'], 
    minlength: [8, 'Password can be minimum 8 characters'],
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
  },
  subcriptionType: { type: String, required: false, default:"Regular"  },
  //oneTimeCode: { type: String, required: false },
  image: {
    type: Object, required: false, default: {
      publicFileUrl: '/images/user.png',
      path: 'public\\images\\user.png'
    }
  },
  isBanned: { type: Boolean, default: false },
  oneTimeCode: { type: String, required: false }
},{
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
    },
  },
},
{ timestamps: true },
);

module.exports = mongoose.model('User', userSchema);