const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const { appendCookiesString, setCookieInResponse } = require('./helpers/cookies');
const { selectAdBasedOnCookie } = require('./helpers/adSelector');
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

app.get('/', (req, res) => {
  res.send('OK');
});
app.get('/ad', (req, res) => {
  const adIframeUrl = selectAdBasedOnCookie(req, res);
  res.send(adIframeUrl);
});

app.get('/productClicked/:productClicked', (req, res) => {
  const { productClicked } = req.params;
  const clickString = appendCookiesString(req, res, 'productClicked', productClicked);
  setCookieInResponse(res, 'productClicked', clickString);
  res.send('OK');
});
app.get('/productViewed/:productViewed', (req, res) => {
  const { productViewed } = req.params;
  const viewString = appendCookiesString(req, res, 'productViewed', productViewed);
  setCookieInResponse(res, 'productViewed', viewString);
  res.send('OK');
});
const PORT = process.env.PORT || 80;
var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('server is listening at http://%s:%s', host, port);
});
