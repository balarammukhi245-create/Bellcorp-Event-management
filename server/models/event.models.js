import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      index: true 
    },
    organizer: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String,
      index: true 
    },
    date: { 
      type: Date,
       required: true, 
       index: true 
      },
    description: String,
    capacity: { 
      type: Number, 
      required: true 
    },
    availableSeats: { 
      type: Number, 
      required: true 
    },
    category: { 
      type: String, 
      index: true 
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

// Text search
eventSchema.index({ name: "text", description: "text" });

export const Event = mongoose.model("Event", eventSchema);
