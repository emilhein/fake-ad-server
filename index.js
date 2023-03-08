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

const port = 80;
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
  res.cookie('productClick', clickArray, { maxAge: 900000, httpOnly: true });
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
