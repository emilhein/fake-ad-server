const express = require('express');
let cors = require('cors');

let cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
  })
);

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
  res.cookie('productClick', clickArray, { maxAge: 900000, sameSite: 'none' });
  res.send('OK');
});
const PORT = process.env.PORT || 80;
var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server is listening at http://%s:%s', host, port);
});
