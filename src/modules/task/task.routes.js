import { Router } from "express";
import { isAuthenticated } from "../../middlewares/authentication.middleware.js";
import * as taskController from './task.controller.js'
const router = Router()

//create Task
router.post( '/', isAuthenticated, taskController.createTask )
// delete Task
router.delete( '/:id', isAuthenticated, taskController.deleteTask )
// update Task
router.patch( '/:id', isAuthenticated, taskController.updateTask )
// get all public Tasks + pagination
router.get( '/all', taskController.getAllTasks )
// get tasks To authenticated User
router.get( '/mine', isAuthenticated, taskController.getMyTasks )
// Search For Task 
router.get( 'search/:id', isAuthenticated, taskController.getTask )
//filteration
router.get( '/filteration', taskController.filterTasks )
// sort 
router.get('/sort',isAuthenticated,taskController.sortTasks)
export default router