// lambda function to verify login

console.log('Loading event');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "AccountDB";
    const response = {
    statusCode: 200,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': false,
    }
   
  };
    return dynamodb.getItem({
            "TableName": tableName,
            "Key": {
                "UserID": {
                    "S": event.UserID
                }
            }
        }).promise();
}
