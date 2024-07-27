 class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

module.exports = CustomError;

///////////// How to use this erro handler///////////////
// // routes.js
// const express = require('express');
// const CustomError = require('./CustomError');
// const router = express.Router();

// // Example synchronous route that throws an error
// router.get('/user/:id', (req, res, next) => {
//     const userId = req.params.id;
//     // Simulate a user not found error
//     if (userId !== '1') {
//         return next(new CustomError('User not found', 404));
//     }
//     res.json({ id: userId, name: 'John Doe' });
// });

// // Example asynchronous route that catches errors
// router.get('/data', async (req, res, next) => {
//     try {
//         const data = await someAsyncOperation();
//         res.json(data);
//     } catch (err) {
//         next(err); // Pass the error to the global error handler
//     }
// });

// module.exports = router;
