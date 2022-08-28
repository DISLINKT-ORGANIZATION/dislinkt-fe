module.exports = defineConfig({
  filenameHashing: false,
  chainWebpack: (config) => {
    config.module.rule("vue").uses.delete("cache-loader");
    config.module.rule("js").uses.delete("cache-loader");
    config.module.rule("ts").uses.delete("cache-loader");
    config.module.rule("tsx").uses.delete("cache-loader");
  },
  transpileDependencies: ["vuetify"],
});
