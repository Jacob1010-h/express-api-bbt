const router = require('express').Router();
const episodes = require('./routes/episodes');
const episodeIndex = require('./routes/episodeIndex');
const episodeName = require('./routes/episodeName');
const episodeSummary = require('./routes/episodeSummary');
const episodeSeason = require('./routes/episodeSeason');

router.get("/episodes", episodes);
router.get("/episode-index/:index", episodeIndex);
router.get("/episode-name/:name", episodeName);
router.get("/episode-summary/:description", episodeSummary);
router.get("/episode-season/:season", episodeSeason);

module.exports = router;
