var billShellController = function(Bill,Login) {
    // get all the bills (accessed at GET http://localhost:8080/api/bills)
    var get = function(req,res) {
        Bill.find(function(err, bills) {
            if (err)
                res.send(err);

            res.json(bills);
        });
    }
// on routes that end in /bills
// ----------------------------------------------------
    var post = function(req,res) {
    // create a bill (accessed at POST http://localhost:8080/bills)

            var bill = new Bill();		// create a new instance of the Bill model
            // set the bills name (comes from the request)
            bill.owners.push(req.body.owners);
            bill.sheetName = req.body.sheetName;
            bill.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bill Shell created!' });
            });
        }
    return {
            post: post,
            get:get
        }

}

module.exports = billShellController;