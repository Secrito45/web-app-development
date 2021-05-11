const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  passwordHash: String,
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecipeModel'
  }]
})

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;