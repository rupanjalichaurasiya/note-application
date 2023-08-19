const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URI
  },
  async function(accessToken, refreshToken, profile, done) {
     const newUser = {
        googleId : profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value
     }
     try{
     let user = await User.findOne({googleId: profile.id});
     if(user){
        done(null,user);
     }
     else{
      user = await User.create(newUser);
      done(null,user); 
     }


     }catch(error){
        console.log(error);
     }
  }
));

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/dashboard'
  })
);




passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Replace User.FindById with your actual user retrieval method
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;
