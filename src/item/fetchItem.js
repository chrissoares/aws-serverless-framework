"use strict"
const AWS = require("aws-sdk");

const fetchItem = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;


    let data;
    let statusCode = 0;

    try {
        const result = await dynamoDB.get(
            {
                TableName: "ItemTableNew",
                Key: {id}
            }
        ).promise();

        statusCode = 200;
        data = JSON.stringify(result.Item);
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
    handler: fetchItem
}
