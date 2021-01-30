function respond(res, data, httpCode) {
    const response = {
      message: data.message,
      status: data.status,
      data: data.response,
    };
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Method', '*');
  
  
    res.writeHead(httpCode);
    res.end(JSON.stringify(response));
  }
  
  module.exports.success = function success(res, response, status = 200) {
    const data = response;
    data.status = "success";
    respond(res, data, status);
  };
  
  module.exports.failure = function failure(res, response, httpCode = 503) {
    const data = response;
    data.status = "error";
    respond(res, data, httpCode);
  };