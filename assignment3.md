# 1 Write a JavaScript function with name **first** which takes only one parameter, which is an array and return first element of array

function definition
```
function first(inputArray){
// wtite your code here
}
```
Test Data :
```
console.log(first([7, 9, 0, -2]));
console.log(first([8],3));
console.log(first([[7, 9, 0],3]));
console.log(first([[7, 9, 0, -2]],6));
console.log(first([[], 7, 9, 0, -2],6));
```
Expected Output :
```
7
8
[7, 9, 0]
[7, 9, 0, -2]
[]
