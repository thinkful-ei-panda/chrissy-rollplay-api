const CommentsService = {
  getAllComments(db) {
    return db
      .select('*')
      .from('rollplay_comments');
  },

  getCommentsByTopic(db, topic_id) {
    return db
      .select('*')
      .from('rollplay_comments')
      .where(
        db.raw(`comment_thread=${topic_id}`)
      );
  },

  postNewComment(db, newComment) {
    return db
      .insert(newComment)
      .into('rollplay_comments')
      .returning('*')
      .then(([comment]) => comment);
  },

  editComment(db, comment_id, comment_passphrase, newEdits) {
    return db('rollplay_comments')
      .update(newEdits)
      .where(
        db.raw(`rollplay_comments.comment_id=${comment_id}
        and rollplay_comments.comment_passphrase=${comment_passphrase}`)
      );
  },

  deleteComment(db, comment_id, comment_passphrase) {
    return db('rollplay_comments')
      .where(
        db.raw(`rollplay_comments.comment_passphrase=${comment_passphrase}
        and rollplay_comments.comment_id=${comment_id}`)
      )
      .delete();
  }
};

module.exports = CommentsService;