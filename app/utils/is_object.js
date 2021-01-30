const isObject = (objValue) => {
    return objValue && typeof objValue === 'object' && objValue.constructor === Object;
}

module.exports = isObject;