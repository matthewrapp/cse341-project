const ItemData = require('../models/ta03');
const {
    filter
} = require('../models/ta03');

exports.ta03 = (req, res, next) => {
    res.render('pages/ta03', {
        title: 'Team Activity 03',
        path: '/ta03', // For pug, EJS
        jsonContent: ItemData.displayJson(),
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
}

exports.getFilteredResults = (req, res, next) => {

    const filteredItems = ItemData.filter(req.query.search);

    res.render('pages/ta03', {
        title: 'Team Activity 03',
        path: '/ta03',
        jsonContent: ItemData.displayJson(),
        filteredItems: filteredItems
    })
}