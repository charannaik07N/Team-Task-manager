const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a project name"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Due"],
    default: "Pending",
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["Admin", "Member"],
        default: "Member",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
projectSchema.index({ createdBy: 1 });

module.exports = mongoose.model("Project", projectSchema);
