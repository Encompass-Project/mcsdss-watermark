'use strict';

module.exports = function(app) {
    // Upload routing
    var uploads = require('../../app/controllers/uploads.server.controller');
    app.route('/uploads').get(uploads.fileUpload);

    // app.post('/upload', function(req, res){
    //     console.log(req.body);
    //     console.log(req.files);
    //     res.json({success: true});
    // });
};