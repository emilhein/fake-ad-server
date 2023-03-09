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

const appendClickArray = (req, key, clickedProduct) => {
  const cookies = req.cookies;
  if (!cookies.key) {
    return clickedProduct;
  }

  if (!cookies[key].includes(clickedProduct)) {
    return `${cookies[key]},${clickedProduct}`;
  }
  return cookies[key];
};

const setCookieInResponse = (res, key, value) => {
  res.cookie(key, value, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: 'none',
    domain: '.fake-ad-server.herokuapp.com',
    secure: true,
    path: '/',
  });
};
app.get('/', (req, res) => {
  res.send('OK');
});
app.get('/ad', (req, res) => {
  const adPaths = {
    cars: 'ads/cars.html',
    phones: 'ads/phones.html',
  };
  const { productClick, productViewed } = res.cookies;
  console.log(productClick, productViewed);
  res.send(adPaths.cars);
});

app.get('/productClicked/:productClicked', (req, res) => {
  const { productClicked } = req.params;
  const clickArray = appendClickArray(req, 'productClicked', productClicked);
  setCookieInResponse(res, 'productClick', clickArray);
  res.send('OK');
});
app.get('/productViewed/:productViewed', (req, res) => {
  const { productViewed } = req.params;
  const viewArray = appendClickArray(req, 'productViewed', productViewed);
  setCookieInResponse(res, 'productViewed', viewArray);
  res.send('OK');
});
const PORT = process.env.PORT || 80;
var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server is listening at http://%s:%s', host, port);
});
