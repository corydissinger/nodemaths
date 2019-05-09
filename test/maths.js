try {
    if (global.gc) {
        global.gc();
    } else {
        console.log("`npm run test -- --expose-gc`");
        process.exit();
    }
} catch (e) {
    console.log("`npm run test -- --expose-gc`");
    process.exit();
}

const assert = require('assert');
const {
    add,
    approximatelyHalf,
} = require('../maths');

const max32Integer = 2147483647;
const minusOneHalfMax = (max32Integer - 1) / 2;

const traceTheSpace = () => {
    const memoryUsage = process.memoryUsage();

    console.log('--- BEGIN TRACE OF SPACE ---');
    console.log('------- ============= -------');
    console.log(JSON.stringify(memoryUsage));
    console.log('------- ============= -------');
    console.log('--- END TRACE OF SPACE ---');
};

const traceTheBase = (worse, better) => {
    console.log('--- BEGIN TRACES OF BASES ---');
    console.log('------- ============= -------');
    console.log(`2  - showing ${worse.toString(2)} is the same as ${better.toString(2)}`);
    console.log(`3  - showing ${worse.toString(3)} is the same as ${better.toString(3)}`);
    console.log(`4  - showing ${worse.toString(4)} is the same as ${better.toString(4)}`);
    console.log(`5  - showing ${worse.toString(5)} is the same as ${better.toString(5)}`);
    console.log(`6  - showing ${worse.toString(6)} is the same as ${better.toString(6)}`);
    console.log(`7  - showing ${worse.toString(7)} is the same as ${better.toString(7)}`);
    console.log(`8  - showing ${worse.toString(8)} is the same as ${better.toString(8)}`);
    console.log(`9  - showing ${worse.toString(9)} is the same as ${better.toString(9)}`);
    console.log(`10 - showing ${worse.toString(10)} is the same as ${better.toString(10)}`);
    console.log(`11 - showing ${worse.toString(11)} is the same as ${better.toString(11)}`);
    console.log(`12 - showing ${worse.toString(12)} is the same as ${better.toString(12)}`);
    console.log(`13 - showing ${worse.toString(13)} is the same as ${better.toString(13)}`);
    console.log(`14 - showing ${worse.toString(9)} is the same as ${better.toString(14)}`);
    console.log(`15 - showing ${worse.toString(9)} is the same as ${better.toString(15)}`);
    console.log(`16 - showing ${worse.toString(9)} is the same as ${better.toString(16)}`);
    console.log('------- ============= -------');
    console.log('--- END TRACES OF BASES ---');
};

const doAndMeasureAdd = (a, b) => {
    global.gc();

    console.time("oldAdd");
    const worse = a + b;
    console.timeEnd("oldAdd");

    traceTheSpace();

    global.gc();

    console.time("newAdd");
    const better = add(a, b);
    console.timeEnd("newAdd");

    // Not the best, should probably check space
    traceTheBase(worse, better);
    traceTheSpace();

    assert.equal(worse, better);
};


const doAndMeasureHalfing = (a) => {
    global.gc();

    console.time("oldHalf");
    const worse = a / 2;
    console.timeEnd("oldHalf");

    traceTheSpace();

    global.gc();

    console.time("newHalf");
    const better = approximatelyHalf(a);
    console.timeEnd("newHalf");

    traceTheBase(worse, better);
    traceTheSpace();

    assert.equal(worse, better);
};

describe('maths', function() {
    describe('-------~~~~~~~~~~~~~ BASIC PROOFS', function() {
        it('max values and stuff pt 1', function() {
            const builtMax = Math.pow(2, 31) - 1;
            assert.equal(max32Integer, builtMax);
        });

        it('max values and stuff pt 2', function() {
            assert.equal(minusOneHalfMax + minusOneHalfMax + 1, max32Integer);
        });
    });

    describe('-------~~~~~~~~~~~~~ QUICK ADDITIONS', function() {
        it('bitwise add should equal 2 + 2', function() {
            doAndMeasureAdd(2, 2);
        });

        it('bitwise add should equal 7 + 13', function() {
            doAndMeasureAdd(7, 13);
        });

        it('bitwise add should equal middle ground', function() {
            doAndMeasureAdd(minusOneHalfMax / 2, minusOneHalfMax / 2);
        });

        it('bitwise add should equal minusOneHalfMax + minusOneHalfMax', function() {
            doAndMeasureAdd(minusOneHalfMax, minusOneHalfMax);
        });
    });

    describe('-------~~~~~~~~~~~~~ FAST HALFING', function() {
        it('bitwise and of two base ten numbers should have', function() {
            doAndMeasureHalfing(2);
            doAndMeasureHalfing(minusOneHalfMax);
            doAndMeasureHalfing(minusOneHalfMax / 2);
            doAndMeasureHalfing(max32Integer);
        });
    });
});