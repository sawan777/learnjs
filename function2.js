// pass params to function
function goodOne(arg1)
{
    console.log('first arg is', arg1);
}

// goodOne(4);
// goodOne('Satyam');
// goodOne([1, 5, 80]);
// let o = {    key1: 'value1',    keyZ: 'valueX'};
// goodOne(o);
// goodOne({ key7: 'value1', keyZ: 'wyweio' }); // annonomious object

function goodTwo(a1, a2, a3)
{
    console.log('args are:', a1, a2, a3);

}
// goodTwo(1, 4, 6);
// goodTwo('Sawan', 4, 'Raja'); // args can be of any type

// goodTwo(1, 4);
// goodTwo();
// goodTwo(1, 4, 12, 20, 12, 22);

function goodObj(a1){
    console.log('arg1', a1);
    a1.sigma = 'Delta';
}

// let o2 = {gamma: 'Pahelwaan'};
// console.log('o2', o2);
// goodObj(o2); // passes o2 as reference, NOT as copy
// console.log('o2', o2);

function isEven(num){
    return (num % 2) == 0;
}

const result = isEven(8);
console.log(result);
console.log(isEven(9));
