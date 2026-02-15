import mongoose from "mongoose";
import dotenv from "dotenv";
import { Event } from "../models/event.models.js";
import { eventsSeed } from "./events.seed.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to:", mongoose.connection.name);

    await Event.deleteMany();
    console.log("Old events removed");

    await Event.insertMany(eventsSeed);
    console.log("New events inserted");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
console.log(eventsSeed);

seedDatabase();
