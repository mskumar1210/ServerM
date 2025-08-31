const express = require('express');
const ContactController=require('../Controllers/ContactController');
const TeacherController = require('../Controllers/TeacherController');

const CourseController = require('../Controllers/CourseController');
const UserController = require('../Controllers/UserController');
const userController = require('../Controllers/UserController');
const BookingController = require('../Controllers/Bookingcontroller');
const checkAuth=require('../middleware/Auth')
const router = express.Router()


router.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

//contact
router.get('/contact',ContactController.display)
router.post('/create',ContactController.create)
router.get('/view/:id',ContactController.view)
router.put('/update/:id',ContactController.update)
router.delete('/delete/:id',ContactController.delete)

//teacher
router.get('/teacher',TeacherController.display)
router.post('/teacherCreate',TeacherController.create)
router.get('/view/:id',TeacherController.view)
router.put('/update/:id',TeacherController.update)

// course
router.get('/course',CourseController.display)
router.post('/coursecreate',CourseController.create)
router.get('/courseview/:id',CourseController.view)
router.put('/courseupdate/:id',CourseController.update)
router.delete('/coursedelete/:id',CourseController.delete)

// user
router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.get('/logout',userController.logout)

//booking
router.post('/booking/create/:courseId',checkAuth,BookingController.createBooking)
router.get('/booking/mybookings',checkAuth,BookingController.getUserBookings)
router.get('/admin/bookings',checkAuth,BookingController.getAllBookings)





module.exports = router