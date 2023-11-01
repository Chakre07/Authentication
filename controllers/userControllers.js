const argon2 = require("argon2");
const knex = require("../knexfile");
// const passport = require("passport");

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const hashedPassword = await argon2.hash(password);

    const [userId] = await knex("users")
      .insert({ username, password: hashedPassword })
      .returning("id");

    req.login({ id: userId, username }, (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json({
        message: "Registration successful",
        user: { id: userId, username },
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register };
