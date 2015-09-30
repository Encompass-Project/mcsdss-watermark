'use strict';

/**
 * Module dependencies.
 */
exports.fileUpload = function(req, res) {
    // res.render('index', {
    //     user: req.user || null,
    //     request: req
    // });
    console.log(req.body);
    console.log(req.files);
    res.json({success: true});
};