function createTopicArray() {
  return [
    {
      topic_id: 4,
      title: 'Test Topic',
      topic_desc: 'Test Topic Description',
      rpg_system: 'Test System',
      date_created: '2020-07-28 12:00:00',
      topic_owner: 1,
      topic_passphrase: 'dummy',
      topic_solved: false
    },
    {
      topic_id: 5,
      title: 'Test Topic2',
      topic_desc: 'Test Topic Description2',
      rpg_system: 'Test System2',
      date_created: '2020-07-28 12:00:00',
      topic_owner: 2,
      topic_passphrase: 'dummy',
      topic_solved: false
    },
    {
      topic_id: 6,
      title: 'Test Topic3',
      topic_desc: 'Test Topic Description3',
      rpg_system: 'Test System3',
      date_created: '2020-07-28 12:00:00',
      topic_owner: 3,
      topic_passphrase: 'dummy',
      topic_solved: false
    }
  ];
}

function createCommentArray() {
  return [
    {
      comment_id: 4,
      comment_desc: 'Test comment desc',
      date_created: '2020-07-28 12:00:00',
      comment_thread: 1,
      comment_owner: 1,
      comment_passphrase: 'dummy',
      marked_solution: false
    },
    {
      comment_id: 5,
      comment_desc: 'Test comment desc2',
      date_created: '2020-07-28 12:00:00',
      comment_thread: 2,
      comment_owner: 2,
      comment_passphrase: 'dummy',
      marked_solution: false
    },
    {
      comment_id: 6,
      comment_desc: 'Test comment desc3',
      date_created: '2020-07-28 12:00:00',
      comment_thread: 3,
      comment_owner: 3,
      comment_passphrase: 'dummy',
      marked_solution: false
    }
  ];
}

// function createFixtures() {
//   const testTopicList = createTopicArray();
//   const testCommentList = createCommentArray();

//   return { testTopicList, testCommentList };
// }

// function seedTopics(db, testTopicList) {
//   return db.into('rollplay_topics').insert(testTopicList);
// }

// function seedComments(db, testCommentList) {
//   return db.into('rollplay_comments').insert(testCommentList);
// }

// function seedAllTables(db, testTopicList, testCommentList) {
//   return db.transaction(async (trx) => {
//     await seedTopics;
//     await seedComments;
//   })

// }

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
    rollplay_topics,
    rollplay_comments
    restart identity cascade`
  );
}

module.exports = {
  createTopicArray,
  createCommentArray,
  // createFixtures,
  cleanTables
};