BEGIN;

INSERT INTO rollplay_users
    (user_id, username, password)
VALUES
  (1, 'Demo', 'password'),
  (2, 'Admin', 'adminPass');

INSERT INTO rollplay_topics
    (topic_id, title, topic_desc, rpg_system, date_created, topic_owner)
  VALUES
    (1, 'Sample Topic', 'Lorem ipsum et cetera', 'D&D', '2020-07-28 12:00:00', 1),
    (2, 'Sample Topic 2', 'Lorem ipsum et cetera', 'Pathfinder', '2020-07-28 12:00:00', 2),
    (3, 'Sample Topic 3', 'Lorem ipsum et cetera', 'Herpenderp', '2020-07-28 12:00:00', 1);

INSERT INTO rollplay_comments
    (comment_id, comment_desc, date_created, comment_thread, comment_owner)
  VALUES
    (1, 'Ive got a', '2020-07-28 12:00:00', 1, 1),
    (2, 'Lovely bunch of', '2020-07-28 12:00:00', 2, 1),
    (3, 'Coconuts dundundun', '2020-07-28 12:00:00', 1, 1);

COMMIT;