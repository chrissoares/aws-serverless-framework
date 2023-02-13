const AWS = require("aws-sdk");

exports.handler = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    let data;
    let statusCode = 0;

    const params ={
        TableName: 'Tasks'
    };

    try{
        const results = await dynamoDB.scan(params).promise();

        statusCode = 201;
        data = results.Items;
        console.log(data);

    } catch (e){
        statusCode = 400;
        data = {
            'msg': 'Fail to get all Tasks.',
            'description': e,
            'debug': {
                'event': event,
                'params': params
            }
        }
    };

    const response ={
        'statusCode': statusCode,
        'body': JSON.stringify({
            'data': data
        })
    };

    return response;

}
