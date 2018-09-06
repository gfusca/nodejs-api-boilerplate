const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    createdAt: {
        type: Date
    },
    metadata: {
        type: Schema.ObjectId,
        ref: 'Metadata'
    }
});


// Hash password before saving
UserSchema.pre('save', function(next) {
    const user = this;
    const SALT_FACTOR = 5;
  
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
});
  
// compare hashed password
UserSchema.methods.comparePassword = function(origPassword, next) {
bcrypt.compare(origPassword, this.password, function(err, isMatch) {
    if (err) {
    return next(err);
    }
    next(null, isMatch);
});
}
  

module.exports = mongoose.model('User', UserSchema);