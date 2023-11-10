const bbt = require('big-bang-theory');

const episodeSummary = (req, res) => {
  res.status(200).json({
    success: true,
    index: req.params.description,
    data: bbt._embedded.episodes.filter(item => item.summary.toLowerCase().includes(req.params.description.toLowerCase())),
  })
}

module.exports = episodeSummary;
