module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: ["/node_modules(?![\\\\/]vue-awesome[\\\\/])/"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,vue}"],
  // coverageReporters: ["html", "text-summary"],
};
