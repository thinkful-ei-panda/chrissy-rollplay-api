const UserService = {
  getUserWithUserName(db, username) {
    return db('rollplay_users').where({username}).first();
  },

  hasUsernameAndPassword(db, username, password) {
    return db('rollplay_users')
      .where(
        db.raw(`rollplay_users.username=${username}
        and rollplay_users.password=${password}`))
      .first()
      .then((user) => !!user);
  },

  insertUser(db, username, password) {
    return db
      .insert(newUser)
      .into('rollplay_users')
      .returning('*')
      .then(([user]) => user);
  }
};

module.exports = UserService;