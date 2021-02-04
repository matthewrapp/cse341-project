exports.ta05 = (req, res, next) => {
    if (req.session.style == null) {
        req.session.style = 'default';
    }
    res.render('pages/ta05', {
        title: 'Team Activity 05',
        path: '/ta05', // For pug, EJS
        style: req.session.style,
        counter: req.session.counter
    });
}

exports.postChangeStyle = (req, res, next) => {
    req.session.style = req.body.themeStyle;
    res.redirect('/ta05');
}

exports.postCounter = (req, res, next) => {
    req.session.counter += parseInt(req.body.count);
    res.redirect('/ta05');
}

exports.postDestroySession = (req, res, next) => {
    if (req.body.destroy == true) {
        req.session.destroy(err => {
            console.log('in destroy function: ');
            console.log(err);
        });
        return res.redirect('/ta05');
    }
    res.redirect('/ta05');
}