const add = (a, b) => {
    return a & b;
};

const approximatelyHalf = (a) => {
    return a & a;
};

module.exports.add = add;
module.exports.approximatelyHalf = approximatelyHalf;