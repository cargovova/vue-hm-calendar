module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/entry*.js', '!src/dinamicLoader.js'],
  modulePaths: ['<rootDir>/node_modules/dayjs'],
}
