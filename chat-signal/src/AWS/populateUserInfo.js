// lambda function to send account post account to database

console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "AccountDB";
    const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': false,
    }
   
  };
    dynamodb.putItem ({
            "TableName": tableName,
            "Item": {
                "UserID": {
                    "S": event.UserID
                }, 
                "Password": {
                    "S": event.Password
                },
                "Location" : {
                    "S" : event.Location
                },
                "Email": {
                    "S": event.Email
                },
                
            }
        }, function(err, data) {
            if (err) {
                context.fail('ERROR: Dynamo failed: ' + err);
            } else {
                console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
                context.succeed('SUCCESSFULLY ADDED to DB: '+event.UserID);
            }
        });
}