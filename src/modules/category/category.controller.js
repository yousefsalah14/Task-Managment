import { Category } from "../../../DB/models/category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createCategory = asyncHandler( async( req, res, next ) =>
{
    const { name } = req.body
    // check category 
    const category = await Category.findOne( { name } )
    if ( category ) return next( new Error( "Category already Exist !!" ), { cause: 409 } )
    await Category.create( {
        name,
        createdBy:req.user._id
    } )
    res.json({sucess:true,message:"category created✅✅"})
} )

export const deleteCategory = asyncHandler(async ( req, res, next ) =>
{
    const { id } = req.params
    const owner = req.user._id
    //check owner 
    const cat = await Category.findOne( { createdBy: owner } )
    if ( !cat ) return next( new Error( "You Don't Have The Right" ) )
    //check category
    const category = await Category.findById( { _id: id } )
    if ( !category ) return ( next( new Error( "category not found" ), { cause: 40 } ) )
    await Category.deleteOne( { _id: id } )
    res.json({success:true , message :"Category Deleted"})
} )

export const updateCategory = asyncHandler( async ( req, res, next ) =>
{
    const { id } = req.params
    const owner = req.user._id
    const{name}=req.body
    //check owner 
    const cat = await Category.findOne( { createdBy: owner } )
    if ( !cat ) return next( new Error( "You Don't Have The Right" ) )
    //check category
    const category = await Category.findById( { _id: id } )
    if ( !category ) return ( next( new Error( "category not found" ), { cause: 404 } ) )
    await category.updateOne( { name } )
    res.json({success:true , message :"Category Updated"})
} )
export const getAllCat = asyncHandler( async ( req, res, next ) =>
{
    const user = req.user._id
    const allCategories = await Category.find( { createdBy: user } )
    if(!allCategories) return next(new Error("no Categories Founded"),{cause: 404})
    res.json({sucess:true,results:{allCategories}})
} )
export const getCat =asyncHandler( async ( req, res, next ) =>
{
    const user = req.user._id
    const catId = req.params.id
    const category = await Category.findOne( { createdBy: user,_id:catId } )
    if(!category) return next(new Error("Category not Found"),{cause: 404})
    res.json( { sucess: true,category } )
} )