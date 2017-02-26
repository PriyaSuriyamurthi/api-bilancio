var express = require('express');
var billRoutes = function(Bill,Login) {
// ROUTES FOR OUR API
// =============================================================================

// create our router
var billRouter = express.Router();

// middleware to use for all requests
billRouter.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

var billShellController = require('../controller/billShellController')(Bill,Login);
billRouter.route('/bills')
	.post(billShellController.post)
	.get(billShellController.get);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
billRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

//Login Controller for Post
    var loginController = require('../controller/loginController')(Login);
    billRouter.route('/login')
        .post(loginController.post);


// on routes that end in /bills/:bill_id
// ----------------------------------------------------

billRouter.use('/bills/:billId',function(req,res,next){
        Bill.findById(req.params.billId, function(err, bill) {
            if (err) {
                res.status(500).send(err);
            } else if(bill) {
            	req.bill = bill;
            	next();
			} else {
                res.status(404).send('no bill found');
            }
        });
	})
billRouter.route('/bills/:bill_id')

	// get the bill with that id
	.get(function(req, res) {
        var returnBill = req.bill.toJSON();
        res.json(returnBill);
	})

	// update the bill with this id
	.put(function(req, res) {

            req.bill.person = req.body.person;  // set the bills name (comes from the request)
            req.bill.Date = req.body.Date;
            req.bill.billType = req.body.billType;
            req.bill.itemAmount = req.body.itemAmount;
            req.bill.Description = req.body.Description;
            req.bill.comments = req.body.comments;
            req.bill.save(function(err) {
				if (err) {
					res.status(500).send(err);
				} else {
                    res.json({message: 'Bill updated!'});
                }
			});

	})

	// delete the bill with this id
	.delete(function(req, res) {
		req.bill.remove(
			function(err, bill) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(204).json({ message: 'Successfully deleted' });;
                }
		});
	});
	return billRouter;
}
module.exports = billRoutes;

