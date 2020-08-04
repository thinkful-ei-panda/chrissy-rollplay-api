// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// function createUserArray() {
//   return [
//     {
//       userId: 4,
//       username: 'test-user',
//       password: 'test-password'
//     },
//     {
//       userId: 5,
//       username: 'test-user2',
//       password: 'test-password2'
//     },
//     {
//       userId: 6,
//       username: 'test-user3',
//       password: 'test-password3'
//     }
//   ];
// }

// function createTopicArray() {
//   return [
//     {
//       topicId: 4,
//       title: 'Test Topic',
//       topicDesc: 'Test Topic Description',
//       rpg_system: 'Test System',
//       date_created: '2020-07-28 12:00:00',
//       topicOwner: 1
//     },
//     {
//       topicId: 5,
//       title: 'Test Topic2',
//       topicDesc: 'Test Topic Description2',
//       rpg_system: 'Test System2',
//       date_created: '2020-07-28 12:00:00',
//       topicOwner: 2
//     },
//     {
//       topicId: 6,
//       title: 'Test Topic3',
//       topicDesc: 'Test Topic Description3',
//       rpg_system: 'Test System3',
//       date_created: '2020-07-28 12:00:00',
//       topicOwner: 3
//     }
//   ];
// }

// function createCommentArray() {
//   return [
//     {
//       commentId: 4,
//       commentDesc: 'Test comment desc',
//       date_created: '2020-07-28 12:00:00',
//       commentThread: 1,
//       commentOwner: 1
//     },
//     {
//       commentId: 5,
//       commentDesc: 'Test comment desc2',
//       date_created: '2020-07-28 12:00:00',
//       commentThread: 2,
//       commentOwner: 2
//     },
//     {
//       commentId: 6,
//       commentDesc: 'Test comment desc3',
//       date_created: '2020-07-28 12:00:00',
//       commentThread: 3,
//       commentOwner: 3
//     }
//   ];
// }

// function seedUsersTable(db, users) {
//   const preppedUsers = users.map((user) => ({
//     ...user,
//     password: bcrypt.hashSync(user.password, 1),
//   }));
//   return db
//     .into('rollplay_users')
//     .insert(preppedUsers)
//     .then(() =>
//       db.raw(`SELECT setval('rollplay_user_id_seq', ?)`, [
//         users[users.length - 1].id,
//       ])
//     );
// }

// function createFixtures() {
//   const testUserList = createUserArray();
//   const testTopicList = createTopicArray();
//   const testCommentList = createCommentArray();

//   return { testUserList, testTopicList, testCommentList };
// }

// function cleanTables(db) {
//   return db.raw(
//     `TRUNCATE
//     rollplay_users,
//     rollplay_topics,
//     rollplay_comments
//     restart identity cascade`
//   );
// }

// module.exports = {
//   createUserArray,
//   createTopicArray,
//   createCommentArray,
//   createFixtures,
//   cleanTables,
//   seedUsersTable
// };