const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(resolve("src/assets/iconsSvg"));
    config.module
      .rule("iconsSvg")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/iconsSvg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  }
};
