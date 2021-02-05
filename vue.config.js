module.exports = {
    css: {
      loaderOptions: {
        sass: {
          additionalData: `
            @import "@/styles/flex_mixins.scss";
            @import "@/styles/style.scss";
          `
        }
      }
    }
  };  