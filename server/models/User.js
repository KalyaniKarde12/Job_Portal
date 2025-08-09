import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, default: '' },
  resume: { type: String, default: '' },
})

const User = mongoose.model('User', userSchema)

export default User;