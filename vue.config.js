const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map', // Pour un meilleur débogage
  },
  chainWebpack: (config) => {
    // Définir les feature flags pour Vue
    config.plugin('define').tap((args) => {
      args[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = false;
      return args;
    });
  },
  devServer: {
    port: 8080,
  },
});
