/**
 * MembersController
 *
 * @description :: Server-side logic for managing Members
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  'new': function(req,res){
    res.view();    
  },

  create: function(req, res) {

    var paramObj = {

      firstname: req.param('firstname'),

      lastname: req.param('lastname'),

      slug: req.param('slug'),

      publish: req.param('publish'),

      biography: req.param('biography'),

      quote: req.param('quote'),

      picture: req.param('picture'),

    }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    Members.create(paramObj, function membersCreated(err, members) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/members/new');
      }

      // res.json(members);
      res.redirect('/members/show/' + members.id);

    });
  },

  show: function(req, res, next) {
    Members.findOne(req.param('id'), function foundMembers(err, members) {
      if (err) return next(err);
      if (!members) return next();

      // res.json(members);
      res.view({
        members: members
      });
    });
  },

  index: function(req, res, next) {
    Members.find(function foundMemberss(err, memberss) {
      if (err) return next(err);
      
      res.view({
        memberss: memberss
      });
    });
  },

  edit: function(req, res, next) {

    Members.findOne(req.param('id'), function foundMembers(err, members) {
      if (err) return next(err);
      if (!members) return next('members doesn\'t exist.');

      res.view({
        members: members
      });
    });
  },

  update: function(req, res, next) {

    var paramObj = {

      firstname: req.param('firstname'),

      lastname: req.param('lastname'),

      slug: req.param('slug'),

      publish: req.param('publish'),

      biography: req.param('biography'),

      quote: req.param('quote'),

      picture: req.param('picture'),

    }

    Members.update(req.param('id'), paramObj, function membersUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/members/edit/' + req.param('id'));
      }

      res.redirect('/members/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    Members.findOne(req.param('id'), function foundMembers(err, members) {
      if (err) return next(err);

      if (!members) return next('Members doesn\'t exist.');

      Members.destroy(req.param('id'), function membersDestroyed(err) {
        if (err) return next(err);
    });        

      res.redirect('/members');

    });
  }
 

};

