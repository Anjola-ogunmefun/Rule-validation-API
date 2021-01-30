const router = require('express').Router();
const bodyParser = require('body-parser');
const Validator = require('validatorjs');
const MainController = require('./controller/index');
router.use(bodyParser.json());


router.get('/', (req, res) => {
    return new MainController().baseEndpoint(req, res)   
});


router.post('/validate-rule', (req, res) => {
    return new MainController().validateRule(req, res);
//   }; 
})




  


module.exports = router;