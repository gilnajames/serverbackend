const usercontroller = require('../Controllers/userController')
const moviecontroller = require('../Controllers/movieController')
const jwtMiddleware=require('../middlewares/jwtMiddleware')
const multerConfig =require('../middlewares/multerMiddleware')

//1) import express

const express = require('express');

//2) create an object for the class Router  in Express
const router = new express.Router();
//3) define paths for resolving request

//1)user registrstion
router.post('/user/register',usercontroller.register)
    
//2)user login
router.post('/user/login',usercontroller.login)


// add movies
router.post('/review/add',jwtMiddleware,multerConfig.single('MovieImage'),moviecontroller.addreview)

//4)get home review
router.get('/review/home-reviews', moviecontroller.dashpage)

//5)get all review
router.get('/review/all-reviews', jwtMiddleware, moviecontroller.getAllreviews)

//6)get user review
router.get('/review/user-reviews', jwtMiddleware, moviecontroller.getUserreview)

// 7) edit user review
router.put('/review/edit/:id', jwtMiddleware, multerConfig.single('MovieImage'), moviecontroller.editUserreview)

// 8) delete user review
router.delete('/review/remove/:id',jwtMiddleware, moviecontroller.deleteUserreview)

// 8) delete user review
router.delete('/review/remove/:id',jwtMiddleware, moviecontroller.deleteUserreview)



//4) export router

module.exports = router;