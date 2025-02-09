const userModel = require("./model");

module.exports = {
  getAll: (req, res) => {
    return res.render("users.hbs", { users: userModel.getAll() });
  },
  create: (req, res) => {
    try {
      const { age, username } = req.body;

      if (!age || !username) {
        throw new Error("Не все поля заполнены");
      }

      userModel.create({ age, username });

      return res.redirect("/users");
    } catch (e) {
      return res.render("users-error.hbs", {
        message: e.message,
      });
    }
  },

  removeById: (req, res) => {
    try {
      const id = req.query.id;

      if (!id) {
        throw new Error("Не передан ID пользователя");
      }

      userModel.removeById({ id });

      res.render("user-view.hbs", {
        users: userModel.getAll(),
      });
      
    } catch (e) {
      return res.render("users-error.hbs", {
        message: e.message,
      });
    }
  },
};
