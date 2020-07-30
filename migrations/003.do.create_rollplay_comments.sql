CREATE TABLE rollplay_comments (
  commentId SERIAL PRIMARY KEY,
  commentDesc TEXT,
  date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
  commentThread INTEGER,
  commentOwner INTEGER
);