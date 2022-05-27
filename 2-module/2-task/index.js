function isEmpty(obj) {
  for (let property in obj) {
    return false;
  }

  return true;
}
