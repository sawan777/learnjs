let marks = {

    math:40,
    history:50,
    sub : [{text: "book ticket",
    text_todo: "book",
    isDone: true,
    lastGeneratedUniqueId: 0}],
    

};
let last= { };

subj = marks.sub;
marks.sub[0].isdone = false;
console.log('marks.history', JSON.stringify(marks.sub));
console.log('marks[history]', marks['history']);
console.log('marks[sub]', marks.sub[0].lastGeneratedUniqueId);
if(last.todo === undefined )
{
    last.todo = 1;
}
console.log("last ", last)
/*marks['math'] = 70;
console.log('marks[math]', marks['math']);
console.log('marks', marks);
marks.science = 68; // key added after creation of object
console.log('marks', marks);
let keys = Object.keys(marks);
console.log('keys', keys);
console.log('keys length', keys.length);
console.log('values', Object.values(marks));
let x = marks; // x is not copy of marks, rather a reference (kind of pointer in c)
x.science = 72;
console.log('marks[science]', marks['science']);

let y = Object.assign({}, marks); // y is a copy of marks
y.science = 78;
console.log('marks[science]', marks['science']);
console.log('marks', marks);
console.log('y    ', y);
*/
