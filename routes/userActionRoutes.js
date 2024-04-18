const express = require('express');
const router = express.Router();
const userActionsController = require('../controllers/userActionsController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.put('/update-details', userActionsController.updateUserDetails);
router.put('/change-password', userActionsController.changePassword);
router.delete('/delete', userActionsController.deleteUser);

module.exports = router;
