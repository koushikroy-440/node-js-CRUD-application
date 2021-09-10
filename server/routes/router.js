const express = require('express');
const route = express.Router();
const render = require('../services/render');
const controller = require("../controller/controller");

 /**
  * @description Root Route
  * @method GET/
  */
route.get('/',render.homeRoute);

/**
  * @description add user
  * @method GET/add-user
  */

route.get('/add-user',render.addUser);

/**
  * @description update user
  * @method GET/ update-user
  */

route.get('/update-user', render.updateUser);

//api
route.post('/api/users',controller.createUser);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);


module.exports = route