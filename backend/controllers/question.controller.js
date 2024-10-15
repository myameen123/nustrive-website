import Questions from "../models/question.model.js";
import cloudinary from "cloudinary";
import shuffle from "lodash/shuffle.js";


// Controller function to add a new question
async function handleUpload(file) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
    folder: "Questions",
  });
  return res;
}

export const add = async (req, res) => {
    try {
      const { test, text, subject, option1, option2, option3, option4  } = req.body; //correctAnswer
  
      console.log("Request body in question controller:", { test, text, subject, option1, option2, option3, option4 }); 
  
      // Check if all required fields are present
      if (!test || !text || !subject || !option1 || !option2 || !option3 || !option4 ) { //|| !correctAnswer
        return res.status(400).json({ error: "All fields are required, including correct answer" });
      }
  
      // Validate that correct answer is part of options
      const options = [option1, option2, option3, option4];
    //   if (!options.includes(correctAnswer)) {
    //     return res.status(400).json({ error: "Correct answer must be one of the provided options" });
    //   }
  
      console.log('req.body', req.body);
  
      const imagesLinks = [];
  
      // Handle file upload if images are provided
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const b64 = Buffer.from(file.buffer).toString("base64");
          const dataURI = `data:${file.mimetype};base64,${b64}`;
          const result = await handleUpload(dataURI);
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      }
  
      const newQuestion = new Questions({
        test,
        text,
        options,
        subject,
        image: imagesLinks,
        //correctAnswer,
      });
  
      console.log("newQuestion", newQuestion);
  
      await newQuestion.save();
      res.status(201).json({
        success: true,
        newQuestion
      });
    } catch (err) {
      console.error("Error adding question:", err.message); 
      res.status(500).json({ error: "Failed to add the question" });
    }
  };
  

// Controller function to get all questions
export const getAll = async (req, res) => {
  try {
      const {testId} = req.params;
    console.log('req in controller', req.params.testId)
    const questions = await Questions.find({test:testId});
    res.json(questions);
    // console.log('in get all question')
  } catch (err) {
    console.error("Error fetching questions:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get a question by ID
export const get = async (req, res) => {
  try {
    const question = await Questions.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  } catch (err) {
    console.error("Error fetching question:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const update = async (req, res) => {
    try {
      const { correctAnswer, options } = req.body;
  
      // Validate that correctAnswer is among the options (if provided in the update)
      if (correctAnswer && options && !options.includes(correctAnswer)) {
        return res.status(400).json({ error: "Correct answer must be one of the provided options" });
      }
  
      const updatedQuestion = await Questions.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!updatedQuestion) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      res.json(updatedQuestion);
    } catch (err) {
      console.error("Error updating question:", err.message);
      res.status(400).json({ error: err.message });
    }
  };
  

// Controller function to delete a question by ID
export const Delete = async (req, res) => {
    try {
      const question = await Questions.findById(req.params.id);
  
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      // If there are images linked, delete them from Cloudinary
      if (question.image && question.image.length > 0) {
        for (const image of question.image) {
          await cloudinary.v2.uploader.destroy(image.public_id);
        }
      }
  
      await question.remove();
      res.json({ message: "Question deleted successfully" });
    } catch (err) {
      console.error("Error deleting question:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  


  
// export const businessTestResponse = async (req, res) => {
//   try {
//     const Business_Questions = await BusinessQuestions.find();
//     const questions = req.body;
//     const subjects = ["math", "english", "iq"];
//     const subjectQuestions = subjects.map((subject) =>
//       Business_Questions.filter((question) => question.subject === subject)
//     );
//     const correctAnswers = subjectQuestions.map((questions) =>
//       questions.map((question) => question.options[0])
//     );
//     const solvedQuestions = subjects.map((subject) =>
//       questions.filter((question) => question.subject === subject)
//     );
//     const subjectResults = subjectQuestions.map((questions, index) =>
//       solvedQuestions[index].map(
//         (question, i) => question.selectedOption === correctAnswers[index][i]
//       )
//     );
//     const scores = subjectResults.map(
//       (results) => results.filter((result) => result).length
//     );
//     const totalScore = scores.reduce((acc, score) => acc + score, 0);

//     res.status(200).json({
//       message: "Successfully",
//       result: {
//         totalScore,
//         mathScore: scores[0],
//         englishScore: scores[1],
//         iqScore: scores[2],
//         totalQuestions: questions.length,
//         totalMathQuestions: subjectQuestions[0].length,
//         totalEnglishQuestions: subjectQuestions[1].length,
//         totaliqQuestions: subjectQuestions[2].length,
//         resultPersentage: (totalScore / questions.length) * 100,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

// export const getTest = async (req, res) => {
//   try {
//     // Extract the subject from the query or request body
//     const { subject } = req.query; // or req.body

//     if (!subject) {
//       return res.status(400).json({ message: "Subject is required" });
//     }

//     // Fetch questions for the specified subject
//     const questions = await Questions.find({ subject }).limit(10); // Adjust limit as needed

//     const shuffledQuestions = questions.map((question) => {
//       const shuffledOptions = shuffle(question.options);
//       return {
//         ...question._doc,
//         options: shuffledOptions,
//       };
//     });

//     res.status(200).json({
//       message: "Successfully fetched",
//       questions: shuffledQuestions,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


export const getTest = async (req, res) => {
  try {
    // Shuffle options of each question in Business_Questions array
    // const {testId} = req.params;
    // console.log('testId', testId)
    const mathQuestions = await Questions.find({test:testId})
      
    //   {
    //   subject: "math",
    // }).limit(6);
    // const physicsQuestions = await Questions.find({
    //   subject: "physics",
    // }).limit(5);
    // const chemistryQuestions = await Questions.find({
    //   subject: "chemistry",
    // }).limit(5);
    // const englishQuestions = await Questions.find({
    //   subject: "english",
    // }).limit(4);

    // const iqQuestions = await Questions.find({
    //   subject: "iq",
    // }).limit(3);

    // Organize questions into an array in the specified order
    const questionsArray = [
      ...mathQuestions,
      // ...physicsQuestions,
      // ...chemistryQuestions,
      // ...englishQuestions,
      // ...iqQuestions,
    ];

    const shuffledQuestions = questionsArray.map((question) => {
      // Shuffle the options array using lodash shuffle function
      const shuffledOptions = shuffle(question.options);

      // Return the question object with shuffled options
      return {
        ...question._doc, // Use ._doc to get the document object without mongoose metadata
        // ...question, // Use ._doc to get the document object without mongoose metadata
        options: shuffledOptions,
      };
    });

    res.status(200).json({
      message: "Successfully",
      questions: shuffledQuestions,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const TestResponse = async (req, res) => {
  try {
    const d_Questions = await Questions.find({test:testId});
    const questions = req.body;
    // const subjects = ["math", "physics", "chemistry", "english", "iq"];
    const subjectQuestions = subjects.map((subject) =>
      d_Questions.filter((question) => question.subject === subject)
    );
    const correctAnswers = subjectQuestions.map((questions) =>
      questions.map((question) => question.options[0])
    );
    const solvedQuestions = subjects.map((subject) =>
      questions.filter((question) => question.subject === subject)
    );
    const subjectResults = subjectQuestions.map((questions, index) =>
      solvedQuestions[index].map(
        (question, i) => question.selectedOption === correctAnswers[index][i]
      )
    );
    const scores = subjectResults.map(
      (results) => results.filter((result) => result).length
    );
    const totalScore = scores.reduce((acc, score) => acc + score, 0);

    res.status(200).json({
      message: "Successfully",
      result: {
        totalScore,
        mathScore: scores[0],
        phusicsScore: scores[1],
        chemistryScore: scores[2],
        englishScore: scores[3],
        iqScore: scores[4],
        totalQuestions: questions.length,
        totalMathQuestions: subjectQuestions[0].length,
        totalPhysicsQuestions: subjectQuestions[1].length,
        totalChemistryQuestions: subjectQuestions[2].length,
        totalEnglishQuestions: subjectQuestions[3].length,
        totaliqQuestions: subjectQuestions[4].length,
        resultPersentage: (totalScore / questions.length) * 100,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
