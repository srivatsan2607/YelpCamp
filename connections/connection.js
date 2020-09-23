var mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.DB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));
