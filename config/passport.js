const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // your Sequelize model

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const googleId = profile.id;

    // Check if user already exists with this email
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Create new user
      user = await User.create({
        email,
        google_id: googleId,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        username: email.split('@')[0]
      });

    } else if (!user.google_id) {
      // Email exists but not linked to Google - link it
      await user.update({ google_id: googleId });

    } else if (user.google_id !== googleId) {
      // Email exists but linked to different Google account
      return done(null, false, { message: "Email already linked to another Google account" });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
