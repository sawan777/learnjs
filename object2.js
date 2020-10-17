var x = {
    titles: ['OS', 'DB'],
    returnDate: '30122020'
};
let marks = { // key then : then value then ,
    math: 65,
    history: 60,
    science: 70,
    books: Object.assign({}, x),
    getTotal: function(){
        return this.math + this.history + this.science;
    },
    isPass: function(){
        return this.getTotal() >= 180;
    },
    result: 'pass',
};
console.log('marks.science', marks.books);
x.returnDate = '01012021';
console.log('marks.science', marks.books);
console.log('marks total', marks.getTotal());
console.log('marks isPass', marks.isPass());