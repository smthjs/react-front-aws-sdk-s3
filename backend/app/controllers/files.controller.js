
var stream = require('stream');
const s3 = require('../config/s3.config.js');

/**
 * @api {post} /api/files/upload
 * @apiName doUpload
 * @apiGroup Files
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} prefix - It's directory for new file
 * @apiParam {File} file bites
 * 
 * @apiSuccessExample Success-Response:
 *  {
 *   Bucket: "somebucket"
 *   ETag: "32efe40bcc900a14102c83e12ab3633d"
 *   Key: "somedirectory/somefile.jpg"
 *   Location: "https://somesite.com/somedirectory/somefile.jpg"
 *   key: "somedirectory/somefile.jpg"
 *  }
 */

 

module.exports.doUpload = (req, res) => {
	
	const { file: {originalname, buffer}, body: {prefix}} = req;
	const { s3Client, bucket} = s3;

	const params = {
		Bucket: bucket,
		Key: prefix ? `${prefix}/${originalname}` : originalname,
		Body: buffer,
	};
	
	s3Client.upload(params, (err, data) => {
		if (err) {
			return res.status(500).json({error: `Error: ${err}`});
		}

		// File uploaded successfully
		return res.json(data);
	});
};
 
/**
 * @api {get} /api/files/download
 * @apiName doDownload
 * @apiGroup Files
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} key - It's file full name
 * 
 * @apiSuccessExample Success-Response:
 *  File
 */
exports.doDownload = (req, res) => {
	const { s3Client, bucket} = s3;
	const {key} = req.query;
	
	const params = {
		Bucket: bucket,
		Key: key,
	};
 
	s3Client.getObject(params)
		.createReadStream()
		.on('error', err => {
			res.status(500).json({error: `Error: ${err}`});
		})
		.pipe(res);
}