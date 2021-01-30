const { details } = require('../config/index');
const isObject = require('../utils/is_object')
const Response = require('../utils/response_handler');

class MainController {

    baseEndpoint(req, res){
        return Response.success(res, {
            message: "My Rule-Validation API",
            response: {
                name: details.name,
                github: details.github,
                email: details.email,
                mobile: details.mobile,
            },
          }, 200)
    }

    validateRule(req, res){
        const input = req.body;

        if(!input.rule) {
            return Response.failure(res, {
                message: 'rule is required.',
                response: null
            }, 400)
        }

        if(!input.data) {
            return Response.failure(res, {
                message: 'data is required.',
                response: null
            }, 400)
        }

        if(!isObject(input.rule)){
            return Response.failure(res, {
                message: 'Invalid JSON payload passed.',
                response: null
            }, 400)
        }

        if(!input.rule.field){
            return Response.failure(res, {
                message: 'field property of rule is required.',
                response: null
            }, 400)
        }
      
        const fieldValue = input.rule.field;
        const { data } = input;
        // check if data is an array, object or string
        let dataFieldValue;

         let data_response = {
            validation: {
                error: false,
                field: fieldValue,
                field_value: dataFieldValue,
                condition: input.rule.condition,
                condition_value: input.rule.condition_value
              }
        }
        if(isObject(data)){
            for (let val in data){
                if(fieldValue == val){
                    dataFieldValue = data[val];
                }
            };
        
        } else if(Array.isArray(data)){
            for (let val of data){
                if(fieldValue == val){
                    dataFieldValue = data[val];
                }
            };
        } else if(typeof data === 'string'){
            for (let val of data){
                if(fieldValue == val){
                    dataFieldValue = data[val];
                }
            };
            if(!dataFieldValue){
                data_response.validation.field_value = data[0];
                return Response.failure(res, {
                    message: `field ${fieldValue} failed validation.`,
                    response: data_response
                    
                }, 400)
            }
            
        } else {
            return Response.failure(res, {
                message: 'data should be an object, array or string.',
                response: null
            }, 400)
            }
        
    
        if(!dataFieldValue){
            return Response.failure(res, {
                message: `${fieldValue} is missing from data.`,
                response: null
            }, 400)
        }
    
        const { condition_value } = input.rule;
    
        // check the type of dataFieldValue, it must be number
        let verified;
        if(input.rule.condition === 'gt'){
            verified = true ? dataFieldValue > condition_value : false;
        } else if(input.rule.condition === 'gte'){
            verified = true ? dataFieldValue >= condition_value : false;
        } else if(input.rule.condition === 'neq'){
            verified = true ? dataFieldValue != condition_value : false;
        } else if(input.rule.condition === 'eq'){
            verified = true ? dataFieldValue == condition_value : false;
        } else {
            // if it is not part of the conditions values, if not gte, nt..
        }
       data_response.validation.field_value = dataFieldValue;
        if(verified){
            return Response.success(res, {
                message: `field ${fieldValue} successfully validated.`,
                response: data_response
            })
        } else {
            return Response.failure(res, {
                message: `field ${fieldValue} failed validation.`,
                response: data_response
            }, 400)
        }
       
    }

    
}
module.exports = MainController