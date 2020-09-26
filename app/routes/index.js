import express from 'express';
import config from '../config/config';

const index = express.Router('/');

index.get('/', (req, res) => {
  if (req.cookies.userAuth) {
    return res.redirect('/home');
  }
  return res.render('index.hbs', config.VK_AUTH);
});

export default index;
