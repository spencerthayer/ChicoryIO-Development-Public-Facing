/**
 * PortfolioController
 *
 * @description :: Server-side logic for managing Portfolios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'new': function (req, res) {
		res.view();
	},

	create: function (req, res) {

		var paramObj = req.params.all();
		/*var paramObj = {

		  title: req.param('title'),

		  slug: req.param('slug'),

		  publish: req.param('publish'),

		  excerpt: req.param('excerpt'),

		  client: req.param('client'),

		  date: req.param('date'),

		  content: req.param('content'),

		  images: req.param('images'),

		}*/

		// Create a User with the params sent from
		// the sign-up form --> new.ejs
		Portfolio.create(paramObj, function portfolioCreated(err, portfolio) {

		  if (err) {
		    console.log(err);
		    req.session.flash = {
		      err: err
		    }
		    return res.redirect('/portfolio/new');
		  }

		  // res.json(portfolio);
		  res.redirect('/portfolio/show/' + portfolio.id);

		});
	},

	show: function (req, res, next) {
		Portfolio.findOne(req.param('id'), function foundPortfolio(err, portfolio) {
		  if (err) return next(err);
		  if (!portfolio) return next();

		  // res.json(portfolio);
		  res.view({
		    portfolio: portfolio
		  });
		});
	},

	index: function (req, res, next) {
		Portfolio.find(function foundPortfolios(err, portfolios) {
		  if (err) return next(err);

		  res.view({
		    portfolios: portfolios
		  });
		});
	},

	edit: function (req, res, next) {
		Portfolio.findOne(req.param('id'), function foundPortfolio(err, portfolio) {
		  if (err) return next(err);
		  if (!portfolio) return next('portfolio doesn\'t exist.');

		  res.view({
		    portfolio: portfolio
		  });
		});
	},

	update: function (req, res, next) {
		var paramObj = req.params.all();
		/*var paramObj = {

		  title: req.param('title'),

		  slug: req.param('slug'),

		  publish: req.param('publish'),

		  excerpt: req.param('excerpt'),

		  client: req.param('client'),

		  date: req.param('date'),

		  content: req.param('content'),

		  images: req.param('images'),

		}*/

		Portfolio.update(req.param('id'), paramObj, function portfolioUpdated(err) {
		  if (err) {
		    console.log(err);

		    req.session.flash = {
		      err: err
		    }

		    return res.redirect('/portfolio/edit/' + req.param('id'));
		  }

		  res.redirect('/portfolio/show/' + req.param('id'));
		});
	},

	destroy: function (req, res, next) {

		Portfolio.findOne(req.param('id'), function foundPortfolio(err, portfolio) {
		  if (err) return next(err);

		  if (!portfolio) return next('Portfolio doesn\'t exist.');

		  Portfolio.destroy(req.param('id'), function portfolioDestroyed(err) {
		    if (err) return next(err);
		});

		  res.redirect('/portfolio');

		});
	}

};
