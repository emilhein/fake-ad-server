const adPaths = {
  cats: 'ads/cats.html',
  dogs: 'ads/dogs.html',
  cars: 'ads/cars.html',
  phones: 'ads/phones.html',
  red_houses: 'ads/red_houses.html',
  aston_martin: 'ads/aston_martin.html',
  motorola_phones: 'ads/motorola.html',
};

exports.selectAdBasedOnCookie = (req, res) => {
  const { productClick } = req.cookies;
  console.log(req.cookies);
  console.log(req);
  let ads = Object.keys(adPaths);
  const randomElement = ads[Math.floor(Math.random() * ads.length)];

  console.log('Based on', productClick, 'we seelct', randomElement);
  return adPaths[randomElement];
};
