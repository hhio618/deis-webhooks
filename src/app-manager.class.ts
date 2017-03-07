import * as fs from 'fs';
const childProcess = require('child_process');

export class AppManager {

  spawnOpts = {
    cwd: ''
  };

  constructor(private repository) {
    this.spawnOpts.cwd = __dirname + `/../repositories/${this.repository}`;
  }

  validate(app: string) {
    // Check project is a valid git repository
    try {
      fs.accessSync(this.spawnOpts.cwd + `/.git`);
    } catch (e) {
      throw Error(`../repositories/${this.repository} is not a valid git repository`);
    }

    // TODO: Check that there's a deis app with the repository name and that it's a pipeline application
    try {
      childProcess.spawnSync(`deis`, [`config`, `--app`, app], this.spawnOpts);
    } catch (e) {

    }

  }

  getAppName(branch: string, id: number): string {
    return branch === 'master' ? `${this.repository}-staging` : `${this.repository}-pr-${id}`;
  }

  create(app: string, branch: string, config: {}) {

    // Transform { one: '1', two: 2 } to "one=1 two=2"
    config = Object.keys(config).map(key => `${key}=${config[key]}`).join(` `);

    try {
      childProcess.spawnSync(`deis`, [`apps:create`, app, `--remote`, app], this.spawnOpts);
      childProcess.spawnSync(`deis`, [`config:set`, `--app`, app, config], this.spawnOpts);
      this.build(app, branch);
      return true;
    } catch (e) {
      throw e;
    }
  }

  destroy(app: string) {
    try {
      childProcess.spawnSync(`deis`, [`apps:destroy`, `--app`, app, `--confirm=${app}`], this.spawnOpts);
      childProcess.spawnSync(`git`, [`remote`, `remove`, app], this.spawnOpts);
      return true;
    } catch (e) {
      throw e;
    }
  }

  build(app: string, branch: string) {
    try {
      childProcess.spawnSync(`git`, [`fetch`], this.spawnOpts);
      childProcess.spawnSync(`git`, [`push`, app, `origin/${branch}`], this.spawnOpts);
      return true;
    } catch (e) {
      throw e;
    }
  }
}
