let array2 = [
  {name: 'George', rank: 1},
  {name: 'Thomas', rank: 2},
  {name: 'Abraham', rank: 5},
  {name: 'Alexander', rank: 10},
  {name: 'Andrew', rank: 20},
  {name: 'Ulysses', rank: 50},
  {name: 'Benjamin', rank: 100},
  {name: 'William', rank: 500},
  {name: 'Grover', rank: 1000},
  {name: 'James', rank: 5000},
  {name: 'Salmon', rank: 10000},
  {name: 'Woodrow', rank: 100000}
];
let newArray = array2.filter(item => item.name.charAt(0) > 'F');
console.log(newArray)
