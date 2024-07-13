import { Schema, Types, model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    taskType: {
        type: String,
        required: true,
        enum: [ 'textTask', 'listTask' ]
    },
    body: {
        type: Schema.Types.Mixed,
        required: true
    }, 
    isPublic: {
        type: Boolean,
        required: true,
        default: true
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required :true
        
    },
    creator: {
        type: Types.ObjectId,
        ref: "User",
        required :true
    }
}, { timestamps: true } );

export const Task = model( "Task", taskSchema )
//test
// {
//     "title": "Sample Text Task",
//     "taskType": "textTask",
//     "body": "This is a sample text task body.",
//     "isPublic": true,
//     "category": "60d5ec49f8a2c40015b3d60a"
//   },
//   {
//     "title": "Sample List Task",
//     "taskType": "listTask",
//     "body": [
//       { "text": "List item 1" },
//       { "text": "List item 2" }
//     ],
//     "isPublic": false,
//     "category": "60d5ec49f8a2c40015b3d60b"
//   }
// ]