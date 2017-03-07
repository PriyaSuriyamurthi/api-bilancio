var billShellController = function(Bill,Login) {
    // get all the bills (accessed at GET http://localhost:8080/api/bills)
    var get = function(req,res) {
        Bill.find(function(err, billshell) {
            if (err) {
                res.send(err);
            } else if(billshell) {
                res.json(billshell);
            } else {
                res.send("No Bill Shell Found");
            }
        });
    }
// on routes that end in /bills
// ----------------------------------------------------
    var post = function(req,res) {
    // create a bill (accessed at POST http://localhost:8080/bills)


           var bill = new Bill();		// create a new instance of the Bill model
            // set the bills name (comes from the request)
            bill.owner= req.body.owner;
            bill.login_id = req.body.login_id;
            bill.sheetName = req.body.sheetName;
            bill.save(function(err) {
                if (err) {
                    res.send("Please try again later");
                } else {
                    res.json(bill);
                }
            });
    }
    return {
            post: post,
            get:get
        }

}

module.exports = billShellController;