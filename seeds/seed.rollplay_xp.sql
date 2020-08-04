BEGIN;

INSERT INTO rollplay_topics
    (topic_id, title, topic_desc, rpg_system, date_created, topic_owner, topic_passphrase, topic_solved)
  VALUES
    (1, 'Sample Topic', 'Lorem ipsum et cetera', 'D&D', '2020-07-28 12:00:00', 'Chatchawan', 'foo', 'FALSE'),
    (2, 'Sample Topic 2', 'Lorem ipsum et cetera', 'Pathfinder', '2020-07-28 12:00:00', 'Karsten', 'oxenfree', 'TRUE'),
    (3, 'Sample Topic 3', 'Lorem ipsum et cetera', 'Herpenderp', '2020-07-28 12:00:00', 'Chrissy', 'help', 'FALSE');

INSERT INTO rollplay_comments
    (comment_id, comment_desc, date_created, comment_thread, comment_owner, comment_passphrase, marked_solution)
  VALUES
    (1, 'Ive got a', '2020-07-28 12:00:00', 1, 'Chrissy', 'bar', 'FALSE'),
    (2, 'Lovely bunch of', '2020-07-28 12:00:00', 2, 'Chatchawan', 'lol', 'FALSE'),
    (3, 'Coconuts dundundun', '2020-07-28 12:00:00', 3, 'Karsten', 'nurp', 'TRUE');

COMMIT;