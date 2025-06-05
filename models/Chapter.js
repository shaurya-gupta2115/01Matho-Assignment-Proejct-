const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  class: { type: String, required: true },
  unit: { type: String, required: true },
  yearWiseQuestionCount: { type: Object, required: true },
  questionSolved: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  isWeakChapter: { type: Boolean, required: true },
});

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
