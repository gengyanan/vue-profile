//图标自动加载
const req = require.context("./svg", false, /\.svg$/);

req.keys().map(req);
