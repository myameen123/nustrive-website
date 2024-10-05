import SubjectFiles from "../models/subject-file.model.js";

// Add a new subject file
export const add = async (req, res) => {
  const { title, description, subject, files, createdBy } = req.body;
  try {
    const newSubjectFile = new SubjectFiles({
      title,
      description,
      subject,
      files,
      createdBy,
    });

    await newSubjectFile.save();
    res.status(201).json(newSubjectFile);
  } catch (error) {
    res.status(500).json({ message: "Failed to create subject file", error });
  }
};

// Update a subject file
export const update = async (req, res) => {
  const { id } = req.params;
  const { title, description, subject, files, createdBy } = req.body;

  try {
    const updatedSubjectFile = await SubjectFiles.findByIdAndUpdate(
      id,
      {
        title,
        description,
        subject,
        files,
        createdBy,
      },
      { new: true }
    );

    if (!updatedSubjectFile) {
      return res.status(404).json({ message: "Subject file not found" });
    }

    res.status(200).json(updatedSubjectFile);
  } catch (error) {
    res.status(500).json({ message: "Failed to update subject file", error });
  }
};

// Delete a subject file
export const deletE = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubjectFile = await SubjectFiles.findByIdAndDelete(id);

    if (!deletedSubjectFile) {
      return res.status(404).json({ message: "Subject file not found" });
    }

    res.status(200).json({ message: "Subject file deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete subject file", error });
  }
};

// Get a single subject file by ID
export const get = async (req, res) => {
  const { id } = req.params;

  try {
    const subjectFile = await SubjectFiles.findById(id).populate("files");

    if (!subjectFile) {
      return res.status(404).json({ message: "Subject file not found" });
    }

    res.status(200).json(subjectFile);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subject file", error });
  }
};

// Get all subject files
export const getAll = async (req, res) => {
  try {
    const subjectFiles = await SubjectFiles.find().populate("files");
    res.status(200).json(subjectFiles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subject files", error });
  }
};
