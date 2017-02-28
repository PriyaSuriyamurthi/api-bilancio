/**
 * Created by priyasuriyamurthi on 2/26/17.
 */
var billSchemaController = function(BillSchema) {

    var post = function(req,res) {
        var billschema = new BillSchema();
        billschema.billShell_id = req.body.billShell_id;
        billschema.person = req.body.person;
        billschema.date = req.body.date;
        billschema.itemAmount = req.body.itemAmount;
        billschema.billType = req.body.billType;
        billschema.description = req.body.description;
        billschema.comments = req.body.comments;
        billschema.createdOn = Date.now();
        billschema.updatedBy =  req.body.person;
        billschema.save(function(err) {
            if(err) {
                res.send({message:"Error adding bills for BillSheet"});
            } else {
                res.send({message:"Bills created"});
            }
        })

    }
    var get = function(req,res) {
        BillSchema.find(function(err,billSchema) {
            if(err) {
                res.send({message: "Error fetching Bills"});
            } else {
                res.json(billSchema);
            }
        });
    }

    return {
        post: post,
        get: get
    }
}
module.exports = billSchemaController;