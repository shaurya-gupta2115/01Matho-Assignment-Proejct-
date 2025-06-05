const Chapter = require('../models/Chapter');
const redisClient = require('../config/redisClient');

//kewal admin ke liye hai ye controller
const uploadChapters = async (req, res, next) => {
  try {
    const chapters = req.body;
    const success = [];
    const failed = [];

    for (const ch of chapters) {
      try {
        const saved = await Chapter.create(ch);
        success.push(saved);
      } catch (err) {
        failed.push({ chapter: ch.chapter, reason: err.message });
      }
    }

    await redisClient.del('all_chapters');
    res.status(201).json({
      successCount: success.length,
      failedCount: failed.length,
      failed
    });
  } catch (err) {
    next(err);
  }
};

const getChapters = async (req, res, next) => {
  try {

    //cache checking
    // yaha pr hum redis se cache check krenge agar cache milega to wahi return krenge
    // agar cache nahi milega to database se fetch krenge aur cache set krenge
    const cached = await redisClient.get("all_chapters");
    if (cached) {
      console.log(">>> Redis cache hit");
      return res.json(JSON.parse(cached));
    }

    console.log(">>> Redis cache miss, fetching from DB");

    //filtering ke liye query object banayenge
    const queryObj = {};
    const { class: cls, unit, status, weakChapters, subject, page = 1, limit = 10 } = req.query;

    if (cls) queryObj.class = cls;
    if (unit) queryObj.unit = unit;
    if (status) queryObj.status = status;
    if (subject) queryObj.subject = subject;
    if (weakChapters === 'true') queryObj.isWeakChapter = true;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Chapter.countDocuments(queryObj);
    const chapters = await Chapter.find(queryObj).skip(skip).limit(Number(limit));


    // yaha pr caching ek ghante ke liye  hi set krenge

    const response = { total, currentPage: page, limit, chapters };
    await redisClient.setEx('all_chapters', 3600, JSON.stringify(response));
    res.json(response);
  } catch (err) {
    next(err);
  }
};

const getChapterById = async (req, res, next) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    res.json(chapter);
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadChapters, getChapters, getChapterById };
