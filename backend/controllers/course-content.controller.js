import CourseContent from "../models/course-content.model.js";
import cloudinary from "cloudinary";

// // Controller function to upload an image
// async function handleUpload(file) {
//   const res = await cloudinary.v2.uploader.upload(file, {
//     resource_type: "auto",
//     folder: "CourseContent",
//   });
//   return res;
// }

// // Add a new CourseContent entry
// const add = async (req, res) => {
//   const {title, course, week, file, test, link } = req.body;
//   try {
//     console.log('req.body: ', req.body)

//     const filesLinks = [];

//     if (req.files && req.files.length > 0) {
//       const b64 = Buffer.from(req.files[0].buffer).toString("base64");
//       let dataURI = "data:" + req.files[0].mimetype + ";base64," + b64;
//       const result = await handleUpload(dataURI);
//       filesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }
//     console.log('filesLinks', filesLinks)
//     const newContent = new CourseContent({ title,course, week, file:filesLinks, test, link });


//     await newContent.save();
//     res.status(201).json(newContent);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add course content' });
//   }
// };

// Controller function to upload an image
async function handleUpload(file) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",  // This will allow for any file type (images, PDFs, etc.)
    folder: "CourseContent", // Folder name in Cloudinary
  });
  return res;
}

// Add a new CourseContent entry
const add = async (req, res) => {
  const { title, course, week, link } = req.body;
  try {
    console.log('req.body: ', req.body);

    const filesLinks = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;

        // Upload to Cloudinary
        const result = await handleUpload(dataURI);
        
        // Add file details (public_id and URL) to the file links array
        filesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    // Create new course content
    const newContent = new CourseContent({ title, course, week, file: filesLinks, link });

    // Save to the database
    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    console.error("Error adding course content:", error);
    res.status(500).json({ error: 'Failed to add course content' });
  }
};

// Get all CourseContent entries
const getAll = async (req, res) => {
  try {
    const courseContents = await CourseContent.find()
      .populate('course')
      //.populate('file')
      //.populate('test')
    res.status(200).json(courseContents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course content' });
  }
};

// Get a single CourseContent by ID
const get = async (req, res) => {
  try {
    const courseContent = await CourseContent.findById(req.params.id)
      .populate('course')
    //   .populate('file')
    //   .populate('test')
    if (!courseContent) return res.status(404).json({ error: 'Course content not found' });
    res.status(200).json(courseContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course content' });
  }
};

// Update CourseContent by ID
const update = async (req, res) => {
  try {
    const updatedContent = await CourseContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('course')
    //   .populate('file')
    //   .populate('test')
    if (!updatedContent) return res.status(404).json({ error: 'Course content not found' });
    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course content' });
  }
};

// Delete a CourseContent by ID
const Delete = async (req, res) => {
  try {
    const deletedContent = await CourseContent.findByIdAndDelete(req.params.id).populate('course');
    if (!deletedContent) return res.status(404).json({ error: 'Course content not found' });
    res.status(200).json({ message: 'Course content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course content' });
  }
};

export { add, getAll, get, update, Delete };
