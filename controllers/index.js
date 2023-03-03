const awesomeFunction = (req, res, next) => {
    res.json('Milexa Torres');
};

const returnAnotherPerson = (req, res, next) => {
    res.json('Super awesome person');
};

module.exports = { awesomeFunction, returnAnotherPerson };