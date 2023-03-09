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
  const { productClicked } = req.cookies;
  console.log('req cookies',req.cookies);
  const cookies = req.cookies;
console.log('deciding', cookies)
  let ads = Object.keys(adPaths);
  const randomElement = ads[Math.floor(Math.random() * ads.length)];

  console.log('Based on', productClicked, 'we seelct', randomElement);
  return adPaths[randomElement];
};
