const AWS = require('aws-sdk');

module.exports = {
    s3Client: new AWS.S3({
        accessKeyId: 'some key',
        secretAccessKey: 'some secret key',
        region : 'some region', //'ru-msk',
        endpoint: 'some endpoint', //'hb.bizmrg.com',
    }),
    bucket: 'some bucket',
};