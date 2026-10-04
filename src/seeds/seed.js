import dotenv from "dotenv";
import mongoose from "mongoose";

import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Resource from "../models/Resource.js";

// Load environment variables from .env
dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect directly to MongoDB because this script runs independently
    // from the Express server.
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected for seed");

    // Clear old seed data to avoid duplicates when running `npm run seed`
    // multiple times.
    await Course.deleteMany({});
    await Module.deleteMany({});
    await Resource.deleteMany({});

    console.log("Old data cleared");

    // Create courses first because modules need Course ObjectIds.
    // insertMany() returns an array of the created Course documents.
    const courses = await Course.insertMany([
      {
        title: "Node.js Basics",
        description: "Learn the fundamentals of Node.js",
        category: "backend",
        level: "beginner",
        published: true,
      },
      {
        title: "Express Fundamentals",
        description: "Build web APIs with Express",
        category: "backend",
        level: "beginner",
        published: true,
      },
      {
        title: "MongoDB Basics",
        description: "Discover MongoDB and document databases",
        category: "database",
        level: "beginner",
        published: true,
      },
      {
        title: "JavaScript Advanced",
        description: "Improve your JavaScript skills",
        category: "javascript",
        level: "advanced",
        published: false,
      },
    ]);

    console.log(`${courses.length} courses created`);

    // Create modules and link each one to a Course using its ObjectId.
    // Example: courses[0]._id = ObjectId of the first created Course.
    const modules = await Module.insertMany([
      {
        title: "Introduction to Node.js",
        order: 1,
        course: courses[0]._id,
      },
      {
        title: "npm and Modules",
        order: 2,
        course: courses[0]._id,
      },
      {
        title: "Express Routing",
        order: 1,
        course: courses[1]._id,
      },
      {
        title: "Express Middleware",
        order: 2,
        course: courses[1]._id,
      },
      {
        title: "MongoDB Documents",
        order: 1,
        course: courses[2]._id,
      },
      {
        title: "Mongoose Basics",
        order: 2,
        course: courses[2]._id,
      },
      {
        title: "Async JavaScript",
        order: 1,
        course: courses[3]._id,
      },
      {
        title: "Advanced Functions",
        order: 2,
        course: courses[3]._id,
      },
    ]);

    console.log(`${modules.length} modules created`);

    // Create resources after modules because every Resource needs
    // the ObjectId of the Module it belongs to.
    const resources = await Resource.insertMany([
      {
        title: "Node.js Introduction Video",
        type: "video",
        url: "https://example.com/node-intro",
        module: modules[0]._id,
      },
      {
        title: "Node.js Runtime Notes",
        type: "article",
        content: "Introduction to the Node.js runtime.",
        module: modules[0]._id,
      },
      {
        title: "npm Documentation",
        type: "link",
        url: "https://docs.npmjs.com/",
        module: modules[1]._id,
      },
      {
        title: "Modules Exercise",
        type: "exercise",
        content: "Create and export a Node.js module.",
        module: modules[1]._id,
      },
      {
        title: "Express Routing Guide",
        type: "article",
        content: "Learn how Express routes work.",
        module: modules[2]._id,
      },
      {
        title: "Express Routing Video",
        type: "video",
        url: "https://example.com/express-routing",
        module: modules[2]._id,
      },
      {
        title: "Middleware Guide",
        type: "article",
        content: "Introduction to Express middleware.",
        module: modules[3]._id,
      },
      {
        title: "MongoDB Documents Guide",
        type: "article",
        content: "Learn how MongoDB documents work.",
        module: modules[4]._id,
      },
      {
        title: "MongoDB Documentation",
        type: "link",
        url: "https://www.mongodb.com/docs/",
        module: modules[4]._id,
      },
      {
        title: "Mongoose Models Guide",
        type: "article",
        content: "Introduction to Mongoose models.",
        module: modules[5]._id,
      },
      {
        title: "Async JavaScript Video",
        type: "video",
        url: "https://example.com/async-js",
        module: modules[6]._id,
      },
      {
        title: "Advanced Functions Exercise",
        type: "exercise",
        content: "Practice advanced JavaScript functions.",
        module: modules[7]._id,
      },
    ]);

    console.log(`${resources.length} resources created`);

    // The seed script is finished, so close the MongoDB connection
    // to allow the Node.js process to exit cleanly.
    await mongoose.connection.close();
    console.log("MongoDB connection closed");

  } catch (error) {
    // Stop the script with an error code if something goes wrong.
    console.error("MongoDB failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();