module.exports = {
    css: {
      loaderOptions: {
        sass: {
          additionalData: `
            @import "@/styles/style.scss";
          `
        }
      }
    }
  };  