ALTER TABLE rollplay_users
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS rollplay_users CASCADE