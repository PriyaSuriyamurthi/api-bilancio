/**
 * Created by priyasuriyamurthi on 2/26/17.
 */
var express = require('express');
var billSchema = function(BillSchema) {
    // create our router
    var billSchemaRouter = express.Router();
    // on routes that end in /bills/:bill_id
// ----------------------------------------------------

    var billSchemaController = require('../controller/billSchemaController')(BillSchema);
    billSchemaRouter.route('/:billShell_id/bills')
        .get(billSchemaController.get)
        .post(billSchemaController.post)


    billSchemaRouter.use('/:billShell_id/bills/:billSchema_id',function(req,res,next){
        billSchemaRouter.findById(req.params.billSchema_id, function(err, bill) {
            if (err) {
                res.status(500).send(err);
            } else if(bill) {
                req.billschema = billschema;
                next();
            } else {
                res.status(404).send('no bill found');
            }
        });
    })
    billSchemaRouter.route('/:billShell_id/bills/:billSchema_id')

    // get the bill with that id
        .get(function(req, res) {
            var returnBill = req.billschema.toJSON();
            res.json(returnBill.billschema);
        })

        // update the bill with this id
        .put(function(req, res) {
            req.billschema.person = req.body.person;  // set the bills name (comes from the request)
            req.billschema.date = req.body.date;
            req.billschema.billType = req.body.billType;
            req.billschema.itemAmount = req.body.itemAmount;
            req.billschema.description = req.body.description;
            req.billschema.comments = req.body.comments;
            req.billschema.createdOn = req.body.createdOn;
            req.billschema.updatedOn = Date.now();
            req.billschema.updatedBy = req.body.updatedBy;
            req.billschema.billShell_id = billShell_id;
            req.billschema.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({message: 'Bill updated!'});
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
                        res.status(204).json({ message: 'Successfully deleted' });;
                    }
                });
        });

    return billSchema;
}
module.exports = billSchema;
