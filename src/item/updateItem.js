"use strict"
const AWS = require("aws-sdk");

const updateItem = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;
    const {itemStatus} = JSON.parse(event.body);


    let data;
    let statusCode = 0;

    const params = {
        TableName: "ItemTableNew",
        Key: {id},
        UpdateExpression: 'set itemStatus = :itemStatus',
        ExpressionAttributeValues: {
            ':itemStatus': itemStatus
        },
        ReturnValues: "ALL_NEW"
    }

    try {
        await dynamoDB.update(params).promise();

        statusCode = 200;
        data = JSON.stringify({
            msg: 'Item updated.'
        });
    } catch (err) {
        data = err;
        statusCode = 400;
    }

    return {
        'statusCode': statusCode,
        'body': data
    }
}

module.exports = {
    handler: updateItem
}
