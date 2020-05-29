module.exports = strapi => {
  const hook = {
    defaults: {},

    async initialize() {
      console.log('Hello Captain Hook!');
    },
  };

  return hook;
};
