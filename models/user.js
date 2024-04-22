const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, validate: {
    validator: function(password) {
      // Password must be at least 6 characters long and contain at least one number and one special character
      return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/.test(password);
    },
    message: props => `${props.value} is not a valid password. It must be at least 6 characters long and contain at least one number and one special character.`,
  }},
  resetPasswordToken: String,
  resetPasswordExpires: Date 
});
 //problem 

userSchema.pre('save', async function(next) {
 
  // const user = this;
  // if (!user.isModified('password')) return next();

  // const salt = await bcrypt.genSalt(10);
  // //problem ends
  // const hash = await bcrypt.hash(user.password, salt);
  // user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
