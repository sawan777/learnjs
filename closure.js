let functions = [];

function test(arg){
    functions.push(
        function() {
            console.log('arg', arg);
        }
    );
}
var o = {a: 1};
test(o);
functions[0]();
console.log('======================')
o.a = 6;
test(o);
console.log('len', functions.length);
functions[0]();
functions[1]();