const sendResponse = (res,success,statusCode, data) => {

    return res.status(statusCode).json({
         success: success,
         data: data
     })
 }
 
 module.exports = sendResponse;