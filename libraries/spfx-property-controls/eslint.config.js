const spfxProfile = require('@microsoft/eslint-config-spfx/lib/flat-profiles/react');

module.exports = [
  {
    // Node.js tooling scripts are not part of the SPFx library source.
    ignores: ['scripts/**', 'postinstall/**', 'gulpfile*.js', 'versionUpdater.mjs']
  },
  ...spfxProfile,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    }
  }
];
