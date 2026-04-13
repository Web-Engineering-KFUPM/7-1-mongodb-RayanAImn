import mongoose from "mongoose";

// Replace this with your real Atlas URI, or set MONGO_URI in your environment.
const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://HasanDB:<db_password>@cluster0.rygtjue.mongodb.net/TestDB";

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  major: String,
});

const Student = mongoose.model("Student", studentSchema);

async function createStudents() {
  await Student.insertMany([
    { name: "Ali", age: 21, major: "CS" },
    { name: "Sara", age: 23, major: "SE" },
  ]);
  console.log("Inserted students");
}

async function readStudents() {
  const all = await Student.find();
  console.log(all);
}

async function updateStudent() {
  await Student.updateOne({ name: "Ali" }, { age: 22 });
  console.log("Updated Ali");
}

async function deleteStudent() {
  await Student.deleteOne({ name: "Sara" });
  console.log("Deleted Sara");
}

async function main() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    await createStudents();
    await readStudents();
    await updateStudent();
    await deleteStudent();
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

main();
