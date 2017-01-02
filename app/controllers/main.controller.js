module.exports = {

  // show the home page
  showHome: (req, res) => {
    res.send('hi client!');
	//res.render('index');
  },

  showHomeAdmin: (req, res) => {
    res.send('Hi Admin!');
  }
};