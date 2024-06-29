import mongoose from "mongoose";

// Can be used to some of this warning:
// Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.

type PlainObject = { [key: string]: any };

function transformObjectIds(obj: any): PlainObject {
  if (Array.isArray(obj)) {
    return obj.map(transformObjectIds);
  } else if (obj && typeof obj === "object") {
    const result: PlainObject = {};
    const doc = obj._doc || obj; // Extract _doc if available
    for (const key of Object.keys(doc)) {
      const value = doc[key];

      if (key.startsWith("$")) {
        continue; // Skip internal Mongoose properties
      }

      if (key === "_id") {
        result[key] = value ? value.toString() : null; // Convert _id to string
      } else if (mongoose.Types.ObjectId.isValid(value)) {
        result[key] = value.toString();
      } else if (value && typeof value === "object") {
        result[key] = transformObjectIds(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }
  return obj;
}

export default transformObjectIds;
