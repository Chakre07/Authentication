const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const argon2 = require("argon2");
const knex = require("./knexfile"); // Import your Knex instance

function initializePassport() {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await knex("users").where({ username }).first();

        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        const passwordMatch = await argon2.verify(user.password, password);

        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await knex("users").where({ id }).first();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}

module.exports = initializePassport;
