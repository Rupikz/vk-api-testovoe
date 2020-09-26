export default {
  PORT: process.env.PORT || 8081,
  PROJECT: 'development',
  ONE_WEEK: 1000 * 60 * 60 * 24 * 7,
  session: {
    secret: 'secret',
    name: 'sid',
    proxy: true,
    resave: true,
    saveUninitialized: true,
  },
  VK_AUTH: {
    client_id: 7532959,
    secret_key: 'uyv3tKlKdU73Ut1SHxwX',
    scope: 'friends',
    response_type: 'code',
    redirect_uri: 'http://localhost:8081/home',
    display: 'page',
    version: '5.120',
  },
};
