const bbt = require('big-bang-theory');

const episodeSeason = (req, res) => {
  res.status(200).json({
    success: true,
    season: req.params.season,
    data: bbt._embedded.episodes.filter(item => item.season == req.params.season),
  })
}

module.exports = episodeSeason;
