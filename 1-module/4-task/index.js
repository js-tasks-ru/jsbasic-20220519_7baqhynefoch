function checkSpam(str) {
  let newStr = str.toLowerCase();

  return newStr.includes("1xBet".toLowerCase()) ||
    newStr.includes("XXX".toLowerCase())
    ? true
    : false;
}
