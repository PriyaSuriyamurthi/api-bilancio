var express = require('express');
var routes = function(Bill) {
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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
billRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bills
// ----------------------------------------------------
billRouter.route('/bills')

	// create a bill (accessed at POST http://localhost:8080/bills)
	.post(function(req, res) {
		
		var bill = new Bill();		// create a new instance of the Bill model
        bill._id = req.body._id;
		bill.person = req.body.person;  // set the bills name (comes from the request)
		bill.Date = req.body.Date;
        bill.billType = req.body.billType;
        bill.itemAmount = req.body.itemAmount;
        bill.Description = req.body.Description;
        bill.comments = req.body.comments;
		bill.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bill created!' });
		});

		
	})

	// get all the bills (accessed at GET http://localhost:8080/api/bills)
	.get(function(req, res) {
		Bill.find(function(err, bills) {
			if (err)
				res.send(err);

			res.json(bills);
		});
	});

// on routes that end in /bills/:bill_id
// ----------------------------------------------------
billRouter.route('/bills/:bill_id')

	// get the bill with that id
	.get(function(req, res) {
		Bill.findById(req.params.bill_id, function(err, bill) {
			if (err)
				res.send(err);
			res.json(bill);
		});
	})

	// update the bill with this id
	.put(function(req, res) {
		Bill.findById(req.params._id, function(err, bill) {

			if (err)
				res.send(err);

            bill.person = req.body.person;  // set the bills name (comes from the request)
            bill.Date = req.body.Date;
            bill.billType = req.body.billType;
            bill.itemAmount = req.body.itemAmount;
            bill.Description = req.body.Description;
            bill.comments = req.body.comments;
			bill.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bill updated!' });
			});

		});
	})

	// delete the bill with this id
	.delete(function(req, res) {
		Bill.remove({
			_id: req.params.bill_id
		}, function(err, bill) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
	return billRouter;
}
module.exports = routes;

