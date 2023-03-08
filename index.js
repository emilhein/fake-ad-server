const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static('public'));
app.use(cookieParser());
//Cors Configuration - Start
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

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
  res.send('OK');
});
app.get('/ad', (req, res) => {
  console.log;
  res.send('OK');
});

app.get('/cookie/:productClicked', (req, res) => {
  const { productClicked } = req.params;
  const clickArray = appendClickArray(req, productClicked);
  res.cookie('productClick', clickArray, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: 'none',
    domain: '.fake-ad-server.herokuapp.com',
    secure: true,
    path: '/interrests',
  });
  res.send('OK');
});
const PORT = process.env.PORT || 80;
var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server is listening at http://%s:%s', host, port);
});
