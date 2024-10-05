import Files from "../models/Files.model.js";

// Add a new file
export const add = async (req, res) => {
  const { department, subject, file } = req.body;

  try {
    const newFile = new Files({
      department,
      subject,
      file,
    });

    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ message: "Failed to add file", error });
  }
};

// Update an existing file by ID
export const update = async (req, res) => {
  const { id } = req.params;
  const { department, subject, file } = req.body;

  try {
    const updatedFile = await Files.findByIdAndUpdate(
      id,
      {
        department,
        subject,
        file,
      },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(updatedFile);
  } catch (error) {
    res.status(500).json({ message: "Failed to update file", error });
  }
};

// Delete a file by ID
export const deletE = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFile = await Files.findByIdAndDelete(id);

    if (!deletedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete file", error });
  }
};

// Get a single file by ID
export const get = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await Files.findById(id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch file", error });
  }
};

// Get all files
export const getAll = async (req, res) => {
  try {
    const files = await Files.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files", error });
  }
};
