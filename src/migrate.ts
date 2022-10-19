import { exec } from 'child_process';
import * as yargs from 'yargs';
import path from 'path';

const commandDescription =
  'Picks up configs from configuration.ts and uses typeorm to generate migrations';

const argv = yargs
  .usage('Usage: $0 <command> [options]')
  .command('migrate', commandDescription)
  .example(
    '$0 migrate -n MigrationName -c ./dist/configuration.js',
    commandDescription,
  )
  .alias('n', 'name')
  .nargs('n', 1)
  .describe('n', 'Load a file')
  .alias('c', 'configuration')
  .alias('c', 'config')
  .nargs('c', 1)
  .describe('c', 'Location of dotenv configuration file')
  .help('h')
  .alias('h', 'help').argv;

let migrationDirectory = path.relative(process.cwd(), 'src/migration/');

// Read the dotenv configuration file if that option was passed in
if (argv.config) {
  const configPath = path.resolve(process.cwd(), argv.config as string);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(configPath);
  migrationDirectory = config.default().migrationsSourceDir[0];
}
const migrationPath = path.join(
  migrationDirectory,
  (argv.name as string) || 'GenericMigration',
);
exec(
  `npm run typeorm migration:generate ${migrationPath}`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  },
);
