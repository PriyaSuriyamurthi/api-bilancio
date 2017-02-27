var loginController = function(Login) {

    var get = function(req,res) {
        Login.find(function(err, logins) {
            if (err)
                res.send(err);

            res.json(logins);
        });
    }

    var post = function(req,res) {
        // create a bill (accessed at POST http://localhost:8080/api/login)

        var login = new Login();

        // create a new instance of the Login model
        // set the bills name (comes from the request)
        login._id = req.body._id;
        login.firstName = req.body.firstName;
        login.lastName = req.body.lastName;
        login.save(function(err) {
            if (err) {
                res.send("LOGIN_ERROR");
            } else {
                res.json({message: 'LOGIN_CREATED!'});
            }
        });
    }
    return {
        post: post,
        get: get
    }

}

module.exports = loginController;