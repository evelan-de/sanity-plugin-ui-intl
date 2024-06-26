module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    "sanity",
    "sanity/typescript",
    "sanity/react",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime"
  ],
  ignorePatterns: [
    "*.js",
    ".eslintrc.js",
    "commitlint.config.js",
    "dist",
    "lint-staged.config.js",
    "package.config.ts"
  ],
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      },
    ]
  }
};
