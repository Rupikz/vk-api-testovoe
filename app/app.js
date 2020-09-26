import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import hbs from 'hbs';
import path from 'path';

import config from './config/config';
import index from './routes/index';
import home from './routes/home';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(config.session));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use('/', index);
app.use('/home', home);

app.listen(config.PORT, () => {
  console.log('server has been started..', config.PORT);
});
