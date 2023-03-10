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

const getCountUnderX = (array, maxCount) =>
  array.filter((ad) => {
    const [_, count] = ad.split('=');
    return count <= maxCount;
  });

const viewSelector = (productViewedArray) => {
  let availableAds = getCountUnderX(productViewedArray, 5);
  if (availableAds.length > 0) {
    return adPaths[availableAds[0].split('=')[0]];
  } else {
    return randomAd();
    F;
  }
};

const clickSelector = (productClickedArray, productViewedArray) => {
  let availableAds = getCountUnderX(productClickedArray, 5).filter(
    (valuePart) => {
      const [adname] = ad.split('=');
      let foundViewed = productViewedArray.find((viewed) => {
        let name = viewed.split('=')[0];
        return name === adname;
      });

      return parseInt(foundViewed.split('=')[1]) <= 5;
    }
  );

  if (availableAds.length > 0) {
    return adPaths[availableAds[0].split('=')[0]];
  } else {
    return randomAd();
  }
};

exports.selectAdBasedOnCookie = (req, res) => {
  const { productClicked, productViewed } = req.cookies;
  const productClickedArray = productClicked ? productClicked.split(',') : [];
  const productViewedArray = productViewed ? productViewed.split(',') : [];
  let returnAdUrl = null;
  if (productClicked) {
    returnAdUrl = clickSelector(productClickedArray, productViewedArray);
  } else if (productViewed) {
    returnAdUrl = viewSelector(productViewedArray);
  } else {
    returnAdUrl = randomAd();
  }

  console.log('Based on cookies we select', returnAdUrl);
  return returnAdUrl;
};
