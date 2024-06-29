import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  courses: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema({
  name: { type: String, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Category = models.Category || model<ICategory>("Category", CategorySchema);

export default Category;

// Add this manually to the mongodb database

// collection name = categories
// Insert this object in it as json:

// [
//   { 
//       "name": "Computer Science", 
//       "courses": [], 
//       "createdAt": { "$date": "2024-05-15T00:00:00.000Z" }, 
//       "updatedAt": { "$date": "2024-05-15T00:00:00.000Z" } 
//   },
//   { 
//       "name": "Music", 
//       "courses": [], 
//       "createdAt": { "$date": "2024-05-15T00:00:00.000Z" }, 
//       "updatedAt": { "$date": "2024-05-15T00:00:00.000Z" } 
//   },
//   { 
//       "name": "Fitness", 
//       "courses": [], 
//       "createdAt": { "$date": "2024-05-15T00:00:00.000Z" }, 
//       "updatedAt": { "$date": "2024-05-15T00:00:00.000Z" } 
//   },
//   { 
//       "name": "Photography", 
//       "courses": [], 
//       "createdAt": { "$date": "2024-05-15T00:00:00.000Z" }, 
//       "updatedAt": { "$date": "2024-05-15T00:00:00.000Z" } 
//   },
//   { 
//       "name": "Accounting", 
//       "courses": [], 
//       "createdAt": { "$date": "2024-05-15T00:00:00.000Z" }, 
//       "updatedAt": { "$date": "2024-05-15T00:00:00.000Z" } 
//   },
//   { 
//       "name": "Engineering", 
//       "courses": [], 
//       "createdAt": { "$date": "2024-05-15T00:00:00.000Z" }, 
//       "updatedAt": { "$date": "2024-05-15T00:00:00.000Z" } 
//   },
//   { 
//       "name": "Filming", 
//       "courses": [], 
//       "createdAt": { "$date": "2024-05-15T00:00:00.000Z" }, 
//       "updatedAt": { "$date": "2024-05-15T00:00:00.000Z" } 
//   }
// ]
