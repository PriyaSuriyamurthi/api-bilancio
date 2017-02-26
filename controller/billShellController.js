var billShellController = function(Bill,Login) {
    // get all the bills (accessed at GET http://localhost:8080/api/bills)
    var get = function(req,res) {
        Bill.find(function(err, billshell) {
            if (err)
                res.send(err);

            res.json(billshell);
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
                if (err) {
                    res.send("Please try again later");
                }
            });
            Login.findByIdAndUpdate(req.body.owners,{$push:{billShell:bill._id}},
                function(err) {
                if (err) {
                    Bill.findOneAndRemove(bill._id, function (err) {
                        if (err) {
                            res.send(err);
                        }
                        res.send({message: 'Problem while linking billShell with User!'});
                    });
                }
                else {
                    res.json({message: 'BillShell created and Linked with User account!'});
                }
            })

                }




    return {
            post: post,
            get:get
        }

}

module.exports = billShellController;