const User = require('../models/user');
const bcrypt = require("bcrypt");
exports.updateUserDetails = async (req, res) => {
  const userId = req.user.userId; 
  const { email } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { email });
    res.status(200).json({ message: 'User details updated successfully' });
  } catch (err) {
    console.error('Error updating user details:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.changePassword = async (req, res) => {
  const userId = req.user.userId;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided old password matches the user's current password
    const validPassword = await user.comparePassword(oldPassword);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    
    // Update the user's password with the hashed one
    user.password = hash;
    await user.save();
    
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.deleteUser = async (req, res) => {
  const userId = req.user.userId; 
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};