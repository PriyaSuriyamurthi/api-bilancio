var express = require('express');
var billRoutes = function(Bill,Login,BillSchema) {
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
billRouter.route('/billshell')
	.post(billShellController.post)
	.get(billShellController.get);

var billSchemaController = require('../controller/billSchemaController')(BillSchema);
    billRouter.route('/billshell/:billShell_id/bills')
        .get(billSchemaController.get)
        .post(billSchemaController.post)

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
billRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

billRouter.use('/billshell/:billShell_id',function(req,res,next){
	Bill.findById(req.params.billShell_id, function(err, bill) {
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
billRouter.route('/billshell/:billShell_id')

// get the bill with that id
	.get(function(req, res) {
		var returnBill = req.bill.toJSON();
		res.json(returnBill);
	})

	// update the bill with this id
	.put(function(req, res) {
		req.bill.login_id = req.bill.login_id;
		req.bill.owner = req.body.owner || req.bill.owner;  // set the bills name (comes from the request)
		req.bill.sheetName = req.body.sheetName || req.bill.sheetName;
		req.bill.createdOn = req.bill.createdOn;
		req.bill.save(function(err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send('Bill Shell updated!');
			}
		});

	})
	.patch(function(req,res){
		if(req.bill._id) {
			delete req.bill._id;
		}
		for(var i in req.body) {
			req.bill[i] = req.body[i];
		}
		req.bill.save(function(err){
			if(err) {
				res.status(500).send(err);
			}
			else
			{
				res.send('Bill Shell updated for fields Passed!');
			}
		})
	})
	// delete the bill with this id
	.delete(function(req, res) {
		req.bill.remove(
			function(err) {
				if (err) {
					res.status(500).send(err);
				}
			})
		BillSchema.find({"billShell_id":req.params.billShell_id}).remove(function(err) {
			if(err) {
                res.status(500).send(err);
			} else {
                res.status(204).send( 'Successfully deleted Bill Shell');
			}
		});
	});


    billRouter.use('/billshell/:billShell_id/bills/:billSchema_id',function(req,res,next){
        BillSchema.findById(req.params.billSchema_id, function(err, billschema) {
            if (err) {
                res.status(500).send(err);
            } else if(billschema) {
                req.billschema = billschema;
                next();
            } else {
                res.status(404).send('no bill found');
            }
        });
    })
    billRouter.route('/billshell/:billShell_id/bills/:billSchema_id')

    // get the bill with that id
        .get(function(req, res) {
        	console.log('inside bill get');
            var returnBill = req.billschema.toJSON();
            res.json(returnBill);
        })

        // update the bill with this id
        .put(function(req, res) {
            if(req.billschema._id) {
                delete req.billschema._id;
            }
        	for(var i in req.billschema) {
        		req.billschema[i] = req.body[i] || req.billschema[i];
			}
            req.billschema.updatedOn = Date.now();
            req.billschema.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send('Bill updated!');
                }
            });

        })
        .patch(function(req,res){
            if(req.billschema._id) {
                delete req.billschema._id;
            }
            for(var i in req.body) {
                req.billschema[i] = req.body[i];
            }
            req.billschema.updatedOn = Date.now();
            req.billschema.save(function(err){
                if(err) {
                    res.status(500).send(err);
                }
                else
                {
                    res.json(req.billschema);
                }
            })
        })
        // delete the bill with this id
        .delete(function(req, res) {
            req.billschema.remove(
                function(err) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        res.status(204).send('Successfully deleted' );;
                    }
                });
        });

	return billRouter;
}
module.exports = billRoutes;

