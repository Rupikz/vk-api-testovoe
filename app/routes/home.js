import express from 'express';
import axios from 'axios';
import config from '../config/config';

const index = express.Router('/');

index.get('/', async (req, res) => {
  try {
    const userCode = req.query.code;
    let cookie;
    if (!req.cookies.userAuth) {
      const params = {
        client_id: config.VK_AUTH.client_id,
        client_secret: config.VK_AUTH.secret_key,
        redirect_uri: config.VK_AUTH.redirect_uri,
        code: userCode,
        v: config.VK_AUTH.version,
      };
      const authResponse = await axios.get('https://oauth.vk.com/access_token?', { params });
      cookie = authResponse.data;
      res.cookie('userAuth', JSON.stringify(cookie), { maxAge: config.ONE_WEEK, httpOnly: true });
    } else {
      cookie = JSON.parse(req.cookies.userAuth);
    }
    const userResponse = await axios.get('https://api.vk.com/method/users.get?', {
      params: {
        access_token: cookie.access_token,
        user_id: cookie.user_id,
        name_case: 'acc',
        v: config.VK_AUTH.version,
      },
    });
    const user = userResponse.data.response[0];
    const userFriendsIdsResponse = await axios.get('https://api.vk.com/method/friends.get?', {
      params: {
        access_token: cookie.access_token,
        user_id: cookie.user_id,
        order: 'random',
        count: 5,
        v: config.VK_AUTH.version,
      },
    });
    const friendsId = userFriendsIdsResponse.data.response.items.join(',');
    const userFriendsResponse = await axios.get('https://api.vk.com/method/users.get?', {
      params: {
        access_token: cookie.access_token,
        user_ids: friendsId,
        fields: 'photo_200,status',
        count: 5,
        v: config.VK_AUTH.version,
      },
    });
    const friends = userFriendsResponse.data.response;
    return res.render('home.hbs', { friends, user });
  } catch (err) {
    res.clearCookie('userAuth');
    return res.redirect('/');
  }
});

export default index;
