'use strict';

/**
 * `isAuthor` policy.
 */

module.exports = async (ctx, next) => {
  const post = await strapi.services.post.findOne({ id: ctx.params.id });
  if (post.author.id !== ctx.state.user.id) {
    ctx.unauthorized('You have no permission to manage this post!');
    return;
  }
  await next();
};
