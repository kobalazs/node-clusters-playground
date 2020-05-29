module.exports = strapi => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        const start = new Date();

        await next();

        console.log(`Endpoint loaded in ${new Date() - start} ms`);
      });
    },
  };
};
