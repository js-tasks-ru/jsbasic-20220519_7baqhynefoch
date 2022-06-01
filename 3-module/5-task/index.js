function getMinMax(str) {
  let numberData = str.split(" ").filter((item) => !isNaN(item));
  let minItem = Math.min(...numberData);
  let maxItem = Math.max(...numberData);

  return {
    min: minItem,
    max: maxItem,
  };
}
