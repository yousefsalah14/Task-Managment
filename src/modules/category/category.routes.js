import { Router } from "express";
import { isAuthenticated } from "../../middlewares/authentication.middleware.js";
import * as categoryController from './category.controller.js'
const router = Router()
 
//create
router.post( '/', isAuthenticated, categoryController.createCategory )
// delete 
router.delete('/:id', isAuthenticated, categoryController.deleteCategory )
//update
router.patch( '/:id', isAuthenticated, categoryController.updateCategory )
//get All
router.get( '/all', isAuthenticated, categoryController.getAllCat )
// get Specific
router.get( '/:id', isAuthenticated, categoryController.getCat )



export default router