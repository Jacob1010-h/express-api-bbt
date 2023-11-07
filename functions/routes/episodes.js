const bbt = require('big-bang-theory');

const episodes = (req, res) => {
  res.status(200).json({
    success: true,
    data: bbt
  })
}

module.exports = episodes;
