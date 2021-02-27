const ItemData = require('../models/ta03');
const itemsPerPage = 10;

let totalCount = 0;

exports.displayProve08 = (req, res, next) => {
    totalCount = 0;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const totalObjects = ItemData.displayJson().length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = ItemData.displayJson().slice(startIndex, endIndex);

    res.render('pages/prove08', {
        title: 'Prove 08 Assignment',
        path: '/prove08', // For pug, EJS
        pageNum: page,
        limit: limit,
        jsonContent: result,
        totalObjects: totalObjects,
        totalCount: null
    });
}

exports.paginateJson = (req, res, next) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    const totalObjects = ItemData.displayJson().length;
    const more = req.query.next;
    const previous = req.query.previous;

    // console.log(Object.keys(ItemData.displayJson()[i].length));

    if (more) {
        page += 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = ItemData.displayJson().slice(startIndex, endIndex);
        totalCount += limit;
        console.log(totalCount);
        res.render('pages/prove08', {
            title: 'Prove 08 Assignment',
            path: '/prove08', // For pug, EJS
            pageNum: page,
            limit: limit,
            jsonContent: result,
            totalObjects: totalObjects,
            totalCount: totalCount
        });
    }

    if (previous) {
        page -= 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = ItemData.displayJson().slice(startIndex, endIndex);
        totalCount -= limit;
        console.log(totalCount);
        res.render('pages/prove08', {
            title: 'Prove 08 Assignment',
            path: '/prove08', // For pug, EJS
            pageNum: page,
            limit: limit,
            jsonContent: result,
            totalObjects: totalObjects,
            totalCount: totalCount
        });
    }
}