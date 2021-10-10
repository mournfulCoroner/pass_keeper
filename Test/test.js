var assert = require('chai').assert;
// var script = require('./../script.js').won;

describe('RandomArray', function() {

    it('method must return array', function () {
        assert.typeOf(createArray(2), 'array')
    })

    it('create array of given size', function () {
        assert.lengthOf(createArray(2), 3);
        assert.lengthOf(createArray(3), 8);
        assert.lengthOf(createArray(5), 24)
    })

    it('numbers in array must be random', function () {
        let check = 0
        let array = createArray(3)
        for(let i = 0; i < array.length-1; i++){
            if(array[i] != array[i+1] + 1){
                check++
            }
        }
        assert.isAbove(check, 0)
    })

});

describe("winning", function() {

    it("if array is correct must be winning", function () {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, "empty"]

        assert.equal(won(array), true)
    })

});

describe("pass_access", function () {
    it("if winning must be returned list with info", function () {
        let array = [1, 2, 3, 4, 5, 6, 7, 8]

        assert.isNotNull(getPasswords(won(array)))
        assert.isObject(getPasswords(won(array)))
    })
});



