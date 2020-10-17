for(
    let i = 0; // init (run only first time)
    i < 2;    // condition, if false then loop will break (run every time, before iteration)
    i++)       // incr/decr (run after each iteration)
{
    console.log('>> ', i);
}
console.log('after loop');