let array1 = [3,6,4,2,7,8,6,10,2,5,4,1];
for (let i=0; i<array1.length; i++) {
  array1[i] = array1[i] + 3;
}
console.log(array1);

let array2 = [3,6,4,2,7,8,6,10,2,5,4,1];
let newArray = array2.map(item => item * 5);

console.log('Old array');
console.log(array2);
console.log('New array * 5');
console.log(newArray);

