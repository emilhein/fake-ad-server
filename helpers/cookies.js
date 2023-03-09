exports.appendClickArray = (req, res, key, item) => {
  const cookies = req.cookies;
  console.log('getting req', cookies);
  if (!cookies[key]) {
    return item;
  }

  if (!cookies[key].includes(item)) {
    return `${cookies[key]},${item}`;
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
