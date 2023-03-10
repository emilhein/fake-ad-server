const adPaths = {
  cats: 'ads/cats.html',
  dogs: 'ads/dogs.html',
  cars: 'ads/cars.html',
  phones: 'ads/phones.html',
  red_houses: 'ads/red_houses.html',
  aston_martin: 'ads/aston_martin.html',
  motorola: 'ads/motorola.html',
};
const randomAd = () => {
  const ads = Object.keys(adPaths);
  const randomElement = ads[Math.floor(Math.random() * ads.length)];
  return adPaths[randomElement];
};

const adselectorAndFrequency = (cookieString) => {
  const adsViewed = cookieString.split(',');
  let availableAds = adsViewed.filter((ad) => {
    const [_, count] = ad.split('=');
    return count <= 5;
  });
  if (availableAds.length > 0) {
    return adPaths[availableAds[0].split('=')[0]];
  } else {
    return randomAd();
  }
};
exports.selectAdBasedOnCookie = (req, res) => {
  const { productClicked, productViewed } = req.cookies;
  let returnAdUrl = null;
  if (productClicked) {
    returnAdUrl = adselectorAndFrequency(productClicked);
  } else if (productViewed) {
    returnAdUrl = adselectorAndFrequency(productViewed);
  } else {
    returnAdUrl = randomAd();
  }

  console.log('Based on cookies we select', returnAdUrl);
  return returnAdUrl;
};
