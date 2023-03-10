exports.appendCookiesString = (req, res, key, item) => {
  const cookies = req.cookies;
  console.log('getting req', cookies);
  if (!cookies[key]) {
    return `${item}=1`;
  } else {
    if (!cookies[key].includes(item)) {
      return `${cookies[key]},${item}=1`;
    } else {
      const stringParts = cookies[key].split(',');
      const addedCount = stringParts
        .map((part) => {
          const [name, count] = part.split('=');
          return `${name}=${parseInt(count) + 1}`;
        })
        .join(',');
      return addedCount;
    }
  }
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
