'use strict';

module.exports = {
  async index(ctx) {
    return ctx.send({ hello: 'world' });
  }
};
