const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const isBoolean = variable => variable === true || variable === false;

const getOption = (option) => {
  const options = [true, false, null];
  return options[option];
};

const pushIntoArray = (sourceArray, targetArray, keyToPush, keyToCheck, targetValue) => {
  sourceArray.forEach((element) => {
    if (isBoolean(targetValue) && element[keyToCheck] === targetValue) {
      targetArray.push(element[keyToPush]);
    }
    if (targetValue === null) {
      targetArray.push(element[keyToPush]);
    }
  });
};

module.exports = {
  sleep,
  pushIntoArray,
  getOption
};
