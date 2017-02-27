/**
 * Created by priyasuriyamurthi on 2/26/17.
 */
var billSchemaController = function(BillSchema) {
    var post = function(req,res) {
        BillSchema.billShell_id = req.body.billShell_id;
        BillSchema.person = req.body.person;
        BillSchema.date = req.body.date;
        BillSchema.itemAmount = req.body.itemAmount;
        BillSchema.billType = req.body.billType;
        BillSchema.description = req.body.description;
        BillSchema.comments = req.body.comments;
        BillSchema.save(function(err) {
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