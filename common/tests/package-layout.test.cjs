const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const root = path.resolve(__dirname, '../..');
const libraryRoot = path.join(root, 'libraries/spfx-property-controls');
const appRoot = path.join(root, 'apps/property-controls-tests');
const library = require(path.join(libraryRoot, 'package.json'));
const app = require(path.join(appRoot, 'package.json'));

test('Rush links a publishable library and a private consuming app', () => {
  const rush = require(path.join(root, 'rush.json'));
  assert.equal(rush.projects.length, 2);
  assert.equal(rush.projects.find(project => project.packageName === library.name).shouldPublish, true);
  assert.equal(rush.projects.find(project => project.packageName === app.name).shouldPublish, false);
  assert.equal(app.private, true);
  assert.equal(app.dependencies[library.name], 'workspace:*');
  assert.equal(fs.existsSync(path.join(libraryRoot, 'src/webparts')), false);
  assert.equal(fs.existsSync(path.join(libraryRoot, 'config/package-solution.json')), false);
});

test('host frameworks are peers with matching local development dependencies', () => {
  const hosts = [
    '@microsoft/sp-adaptive-card-extension-base',
    '@microsoft/sp-component-base',
    '@microsoft/sp-core-library',
    '@microsoft/sp-http',
    '@microsoft/sp-lodash-subset',
    '@microsoft/sp-office-ui-fabric-core',
    '@microsoft/sp-property-pane',
    '@microsoft/sp-webpart-base',
    'react',
    'react-dom',
    '@types/react',
    '@types/react-dom'
  ];
  for (const name of hosts) {
    assert.ok(library.peerDependencies[name], `${name} must be a peer`);
    assert.equal(library.dependencies[name], undefined, `${name} must not be a regular dependency`);
    assert.equal(library.devDependencies[name], app.dependencies[name] || app.devDependencies[name]);
  }
  assert.ok(library.dependencies['@fluentui/react']);
  assert.ok(library.dependencies['monaco-editor']);
});

test('the npm archive preserves control entry points and resources without test or build files', () => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const [archive] = JSON.parse(execFileSync(npm, [
    'pack', '--dry-run', '--ignore-scripts', '--foreground-scripts=false', '--json'
  ], {
    cwd: libraryRoot,
    encoding: 'utf8',
    shell: process.platform === 'win32'
  }));
  const files = new Set(archive.files.map(file => file.path));
  assert.ok(files.has(library.main));
  assert.ok(files.has(library.types));
  assert.ok(files.has('postinstall/install.js'));
  assert.ok(files.has('LICENCE'));
  for (const name of fs.readdirSync(path.join(libraryRoot, 'src'))) {
    if (name.endsWith('.ts') && !name.endsWith('.d.ts')) {
      const base = name.slice(0, -3);
      assert.ok(files.has(`lib/${base}.js`), `${base} JavaScript entry point is missing`);
      assert.ok(files.has(`lib/${base}.d.ts`), `${base} declaration entry point is missing`);
    }
  }
  for (const name of fs.readdirSync(path.join(libraryRoot, 'src/loc'))) {
    assert.ok(files.has(`lib/loc/${name}`), `${name} localization resource is missing`);
  }
  for (const file of files) {
    assert.doesNotMatch(file, /^(src|config|temp|release|rush-logs|lib-commonjs|jest-output|\.heft|\.rush)\//);
    assert.doesNotMatch(file, /(^|\/)webparts\/|\.test\.|\.sppkg$/);
  }
  const styles = fs.readdirSync(path.join(libraryRoot, 'src'), { recursive: true })
    .filter(file => file.endsWith('.scss'));
  assert.ok(styles.length > 0);
  for (const style of styles) {
    assert.ok(files.has(`lib/${style.replaceAll(path.sep, '/')}.css`),
      `${style} compiled CSS is missing`);
  }
});

test('the test app uses library localization and produces its own solution', () => {
  const config = require(path.join(appRoot, 'config/config.json'));
  assert.equal(config.localizedResources.PropertyControlStrings,
    'node_modules/@pnp/spfx-property-controls/lib/loc/{locale}.js');
  assert.ok(fs.existsSync(path.join(appRoot,
    'node_modules/@pnp/spfx-property-controls/lib/loc/en-us.js')));
  const solution = require(path.join(appRoot, 'config/package-solution.json'));
  assert.ok(fs.existsSync(path.join(appRoot, 'sharepoint', solution.paths.zippedPackage)));
});
