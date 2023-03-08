const express = require('express');

let cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
//Cors Configuration - Start
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  next();
});
//Cors Configuration - End

const appendClickArray = (req, clickedProduct) => {
  const cookies = req.cookies;
  if (!cookies.productClick) {
    return clickedProduct;
  }

  if (!cookies.productClick.includes(clickedProduct)) {
    return `${cookies.productClick},${clickedProduct}`;
  }
  return cookies.productClick;
};
app.get('/', (req, res) => {
  // console.log('Cookies: ', req.cookies);
  res.send('OK');
});

app.get('/cookie/:productClicked', (req, res) => {
  const { productClicked } = req.params;
  const clickArray = appendClickArray(req, productClicked);
  res.cookie('productClick', clickArray, {
    maxAge: 900000,
    sameSite: 'none',
    domain: 'https://fake-ad-server.herokuapp.com/',
    secure: true,
  });
  res.send('OK');
});
const PORT = process.env.PORT || 80;
var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server is listening at http://%s:%s', host, port);
});
