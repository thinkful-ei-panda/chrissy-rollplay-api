const CommentsService = {
  getCommentsByUser(db, user) {
    return db
      .select(
        'rollplay_comments.comment_id',
        'rollplay_comments.comment_desc',
        'rollplay_comments.date_created',
        'rollplay_comments.comment_thread',
        'rollplay_comments.comment_owner'
      )
      .from('rollplay_comments')
      .where(
        db.raw('comment_owner', user)
      );
  },

  getCommentsByTopic(db, topic) {
    return db
      .select(
        'rollplay_comments.comment_id',
        'rollplay_comments.comment_desc',
        'rollplay_comments.date_created',
        'rollplay_comments.comment_thread',
        'rollplay_comments.comment_owner'
      )
      .from('rollplay_comments')
      .where(
        db.raw(`comment_thread=${topic}`)
      );
  },

  postNewComment(db, newComment) {
    return db
      .insert(newComment)
      .into('rollplay_comments')
      .returning('*')
      .then(([comment]) => comment);
  },

  editComment(db, comment_id, comment_owner, newEdits) {
    return db('rollplay_comments')
      .update(newEdits)
      .where(
        db.raw(`rollplay_comments.comment_id=${comment_id}
        and rollplay_comments.comment_owner=${comment_owner}`)
      );
  },

  deleteComment(db, comment_owner, comment_id) {
    return db('rollplay_comments')
      .where(
        db.raw(`rollplay_comments.comment_owner=${comment_owner}
        and rollplay_comments.comment_id=${comment_id}`)
      )
      .delete();
  }
};

module.exports = CommentsService;