const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const pushIntoArray = (sourceArray, targetArray, keyToPush, keyToCheck, targetValue) => {
  sourceArray.forEach((element) => {
    if (targetValue && element[keyToCheck] === targetValue) {
      targetArray.push(element[keyToPush]);
    }
    if (!targetValue) {
      targetArray.push(element[keyToPush]);
    }
  });
};

module.exports = {
  sleep,
  pushIntoArray
};
