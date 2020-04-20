function randomInt(min, max) {
  return parseInt(min + Math.random() * (max - min))
}

module.exports = randomInt