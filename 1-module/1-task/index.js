function factorial(n) {
  let result = 1;

  if (!isFinite(n) || !Number.isInteger(n) || n < 0) {
    return;
  } else if (n === 0 || n === 1) {
    return result;
  } else {
    for (let i = 1; i <= n; i++) {
      result = result * i;
    }
    return result;
  }
}
