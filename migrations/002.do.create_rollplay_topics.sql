CREATE TABLE rollplay_topics (
  topicId SERIAL PRIMARY KEY,
  title TEXT,
  topicDesc TEXT,
  rpg_system TEXT,
  date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
  topicOwner INTEGER
);


  -- topicOwner TEXT REFERENCES rollplay_users(userId)