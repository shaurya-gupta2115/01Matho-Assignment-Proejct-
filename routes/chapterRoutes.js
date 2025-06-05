const express = require('express');
const router = express.Router();
const { uploadChapters, getChapters, getChapterById } = require('../controllers/chapterController');
const adminAuth = require('../middlewares/adminAuth');

router.get('/', getChapters);
router.get('/:id', getChapterById);
router.post('/', adminAuth, uploadChapters);

module.exports = router;
