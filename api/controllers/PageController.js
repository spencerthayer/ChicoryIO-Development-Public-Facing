/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
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

            content: req.param('content'),

        }*/
        
        // Create a User with the params sent from
        // the sign-up form --> new.ejs
        Page.create(paramObj, function pageCreated(err, page) {

            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }
                return res.redirect('/page/new');
            }

            // res.json(page);
            res.redirect('/page/show/' + page.id);

        });
    },

    show: function (req, res, next) {
        Page.findOne(req.param('id'), function foundPage(err, page) {
            if (err) return next(err);
            if (!page) return next();

            // res.json(page);
            res.view({
                page: page
            });
        });
    },

    index: function (req, res, next) {
        Page.find(function foundPages(err, pages) {
            if (err) return next(err);

            res.view({
                pages: pages
            });
        });
    },

    edit: function (req, res, next) {

        Page.findOne(req.param('id'), function foundPage(err, page) {
            if (err) return next(err);
            if (!page) return next('page doesn\'t exist.');

            res.view({
                page: page
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

            content: req.param('content'),

        }*/
        
        Page.update(req.param('id'), paramObj, function pageUpdated(err) {
            if (err) {
                console.log(err);

                req.session.flash = {
                    err: err
                }

                return res.redirect('/page/edit/' + req.param('id'));
            }

            res.redirect('/page/show/' + req.param('id'));
        });
    },

    destroy: function (req, res, next) {

        Page.findOne(req.param('id'), function foundPage(err, page) {
            if (err) return next(err);

            if (!page) return next('Page doesn\'t exist.');

            Page.destroy(req.param('id'), function pageDestroyed(err) {
                if (err) return next(err);
            });

            res.redirect('/page');

        });
    }


};