function sumSalary(salaries) {
  let sum = 0;

  for (let item in salaries) {
    if (typeof salaries[item] === "number" && isFinite(salaries[item])) {
      sum = sum + salaries[item];
    }
  }

  return sum;
}
