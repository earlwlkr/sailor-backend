const url = require('url');

const settings = {
  client: 'postgres',
  timezone: 'Asia/Ho_Chi_Minh',
};

if (process.env.DATABASE_URL) {
  const parsed = url.parse(process.env.DATABASE_URL, true);
  const [username, password] = parsed.auth.split(':');

  settings.host = parsed.hostname;
  settings.port = Number(parsed.port);
  settings.database = parsed.pathname.substr(1);
  settings.username = username;
  settings.password = password;
  settings.ssl = true;
}

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings,
      options: {},
    },
  },
});
