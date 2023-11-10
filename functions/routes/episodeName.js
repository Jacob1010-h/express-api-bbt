const bbt = require('big-bang-theory');

const episodeName = (req, res) => {
  res.status(200).json({
    success: true,
    name: req.params.name,
    data: bbt._embedded.episodes.filter(episode => episode.name.toLowerCase().includes(req.params.name.toLowerCase())),
  })
}

module.exports = episodeName;
