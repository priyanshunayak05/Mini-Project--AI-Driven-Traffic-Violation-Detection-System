import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  licenseNumber: String,
  vehicles: [
    {
      vehicleNumber: String,
      vehicleType: String,
      challans: [
        {
          challanId: String,
          date: String,
          violation: String,
          location: String,
          fineAmount: Number,
          status: String,
          evidence: {
            screenshot: String
          }
        }
      ]
    }
  ]
});

const User = mongoose.model("User", userSchema);
export default User;