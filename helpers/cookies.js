exports.appendClickArray = (req, key, clickedProduct) => {
  const cookies = req.cookies;
  if (!cookies.key) {
    return clickedProduct;
  }

  if (!cookies[key].includes(clickedProduct)) {
    return `${cookies[key]},${clickedProduct}`;
  }
  return cookies[key];
};

exports.setCookieInResponse = (res, key, value) => {
  res.cookie(key, value, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: 'none',
    domain: '.fake-ad-server.herokuapp.com',
    secure: true,
    path: '/',
  });
};
