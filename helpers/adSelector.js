const adPaths = {
  cats: 'ads/cats.html',
  dogs: 'ads/dogs.html',
  cars: 'ads/cars.html',
  phones: 'ads/phones.html',
  red_houses: 'ads/red_houses.html',
  aston_martin: 'ads/aston_martin.html',
  motorola_phones: 'ads/motorola.html',
};
const randomAd = () => {
  const ads = Object.keys(adPaths);
  const randomElement = ads[Math.floor(Math.random() * ads.length)];
  return adPaths[randomElement];
};
const adFromClicked = (productClicked) => {
  const adsClicked = productClicked.split(',');
};
const adFromViewed = (productViewed) => {
  const adsViewed = productViewed.split(',');
};
exports.selectAdBasedOnCookie = (req, res) => {
  const { productClicked, productViewed } = req.cookies;
  let returnAdUrl = null;
  if (productClicked) {
    returnAdUrl = adFromClicked(productClicked);
  } else if (productViewed) {
    returnAdUrl = adFromViewed(productViewed);
  } else {
    returnAdUrl = randomAd();
  }

  console.log('Based on cookies we select', returnAdUrl);
  return returnAdUrl;
};
