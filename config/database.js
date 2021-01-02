const url = require('url');

function getConfig(env) {
  const settings = {
    client: 'postgres',
    host: env('DATABASE_HOST'),
    port: env.int('DATABASE_PORT'),
    database: env('DATABASE_NAME'),
    username: env('DATABASE_USERNAME'),
    password: env('DATABASE_PASSWORD'),
  };

  if (process.env.DATABASE_URL) {
    const parsed = url.parse(process.env.DATABASE_URL, true);
    const [username, password] = parsed.auth.split(':');

    settings.host = parsed.hostname;
    settings.port = Number(parsed.port);
    settings.database = parsed.pathname.substr(1);
    settings.username = username;
    settings.password = password;
    settings.ssl = false;
  }
  return settings;
}

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
