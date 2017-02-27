var express = require('express');
var loginRoutes = function(Login) {

// ROUTES FOR LOGIN
// =============================================================================

// create our router
    var loginRouter = express.Router();
    // middleware to use for all requests
    loginRouter.use(function(req, res, next) {
        // Entered login Router
        console.log('Entered Login Process.');
        next();
    });
//Login Controller for Post
    var loginController = require('../controller/loginController')(Login);
    loginRouter.route('/login')
        .post(loginController.post)
        .get(loginController.get);

    return loginRouter;
}
module.exports = loginRoutes;