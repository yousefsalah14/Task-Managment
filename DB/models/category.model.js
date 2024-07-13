import { Schema, Types, model } from "mongoose";

const categorySchema = Schema( {
    name: {
        type: String,
        required: true,
        unique:true
    },
    createdBy: {
        type: Types.ObjectId,
        ref:"User"
    }
}, { timestamps: true } )
export const Category = model('Category',categorySchema)