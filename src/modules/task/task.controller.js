import { Category } from "../../../DB/models/category.model.js";
import { Task } from "../../../DB/models/task.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createTask = asyncHandler( async ( req, res, next ) =>
{
    const { category } = req.body
    const task = await Task.findOne( { ...req.body } )
    if ( task ) return next( new Error( "Task Already Exist" ), { cause: 409 } )
    const catExist = await Category.findOne( { _id: category } )
    if(!catExist) return next(new Error("Category not Exist"),{cause:404})
    await Task.create( { ...req.body,creator:req.user._id })
    res.json({success:true,message :"Task Created succesfully✅✅"})
} )
export const deleteTask = asyncHandler( async ( req, res, next ) =>
{
    const id = req.params.id
    const creator = req.user._id
    //check owner 
    const taskCreator = await Task.findOne( { creator } )
    if ( !taskCreator ) return next( new Error( "You don't Have The Right" ) )
    // check exist
        const taskExist = await Task.findById( { _id: id } )
    if ( !taskExist ) return next( new Error( "Task Not Found" ), { cause: 404 } )
    await Task.deleteOne( { _id: id } )
    res.json({success:true,message: "Task Deleted Successfully"})
    
} )
export const updateTask = asyncHandler( async ( req, res, next ) =>
{
    const id = req.params.id
    const creator = req.user._id
    //check owner 
    const taskCreator = await Task.findOne( { creator } )
    if ( !taskCreator ) return next( new Error( "You don't Have The Right" ) )
    // check exist
        const taskExist = await Task.findById( { _id: id } )
    if ( !taskExist ) return next( new Error( "Task Not Found" ), { cause: 404 } )
    await Task.updateOne( { ...req.body } )
    res.json({success:true,message:"Task Updated Successfully"})
} )
export const getAllTasks = asyncHandler( async ( req, res, next ) =>
{
    const page = req.query.page
    const limit = 2
    const skip = limit * ( page - 1 )
    if ( page ) {
        // pagination
        const allTasks = await Task.find( { isPublic: true } ).skip( skip ).limit( limit )
        if ( !allTasks ) return next( new Error( "No Tasks Found" ), { cause: 404 } )
        res.json( { success: true, Tasks: { allTasks } } )
    } else {
        const allTasks = await Task.find( { isPublic: true } )
        res.json( { success: true, Tasks: { allTasks } } )
    }
} )
export const getMyTasks = asyncHandler( async ( req, res, next ) =>
{
    const creator = req.user._id
    const Tasks = await Task.find( { creator } )
    if ( !Tasks ) return next( new Error( "No Tasks Founded!!" ), { cause: 404 } )
    res.json({success:true , Tasks })
} )
export const getTask = asyncHandler( async ( req, res, next ) =>
{
    const id = req.params.id

    const taskCreator = await Task.findOne( { creator : req.user._id } )
    if ( !taskCreator ) return next( new Error( "You don't Have The Right" ) )
    // check exist
        const taskExist = await Task.findById( { _id: id, } )
    if ( !taskExist ) return next( new Error( "Task Not Found" ), { cause: 404 } )
    res.json({success:true ,Task :{taskCreator}})
} )
export const filterTasks = asyncHandler( async ( req, res, next ) =>
{
    const { isPublic, categoryName } = req.query
    const filter = {};
 if (categoryName) {
    const category = await Category.findOne({ name: categoryName });
    if (category) {
      filter.category = category._id;
    } else {
      return next(new Error("Category Not Found"), { cause: 404 });
    }
  }
  const allTasks = await Task.find(filter).populate('category');
  if (!allTasks) {
    return next(new Error("No Tasks Found"), { cause: 404 });
  }

  res.json({ success: true, tasks: allTasks });
} );
export const sortTasks = asyncHandler( async ( req, res, next ) =>
{
    const { sort } = req.query
    const sortedTasks = await Task.find( { isPublic: true } ).populate( 'category' ).sort( sort )
    if(!sortedTasks) return next(new Error("no Tasks Founded"),{cause:404})
    res.json({sucess:true,Tasks :sortedTasks})
})