// const date = new Date();
// console.log('in coding', date.toLocaleTimeString());

function add(x, y) {
  return x + y;
}

console.log(add(3, 4));

export function flattern(arr) {
  const result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattern(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

export function callCallback(number, callback) {
  if (number < 10) {
    return number;
  }
  callback(number + 5);
}
