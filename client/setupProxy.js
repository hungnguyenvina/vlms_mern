const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/api/', 
        { target: 'https://arcane-wave-25280.herokuapp.com/' }
    ));
}