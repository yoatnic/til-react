module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: ["**/__tests__/**/*test.ts?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
  // moduleNameMapper: {
  //   "^components/(.+)$": "<rootDir>/src/components/$1",
  //   "^actions/(.+)$": "<rootDir>/src/actions/$1",
  //   "^containers/(.+)$": "<rootDir>/src/containers/$1",
  //   "^reducers/(.+)$": "<rootDir>/src/reducers/$1"
  // }
};
