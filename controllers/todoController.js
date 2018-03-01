module.exports = function(app) {
    var index = require('./index');
    app.use('/', index);
}