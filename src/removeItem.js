"use strict"
const AWS = require("aws-sdk");

const removeItem = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;

    let data;
    let statusCode = 0;

    const params = {
        TableName: "ItemTableNew",
        Key: {id}
    }

    try {
        await dynamoDB.delete(params).promise();

        statusCode = 200;
        data = JSON.stringify({
            msg: 'Item deleted.'
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
    handler: removeItem
}
