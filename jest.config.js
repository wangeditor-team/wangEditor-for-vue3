module.exports = {
  preset: "ts-jest",
  setupFiles: ["./jestsetup.js"],
  // globals: {
  //   AggregateError: {},
  // },
  testEnvironment: "jsdom",
  // 转义
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest",
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
};
