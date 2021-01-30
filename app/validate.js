

const validator = (data, rule, customMessages, callback) => {
    console.log({rule, data} )
const validation = new Validator(data, rule, customMessages);

validation.passes(() => callback(null, true));

validation.fails(() => callback(validation.errors, false));

};

const confirm = (req, res, next) => {
    const criteria = {
        field: "required|string",
        condition: "required|string",
        condition_value: "required|integer"
    }

    validator(data, criteria, {}, (err, status) => {
        if (err) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
        });
}



module.exports = {confirm}