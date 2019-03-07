const s3 = require('../config/s3.config.js');
 
/**
 * @api {get} /api/objects
 * @apiName getListObjects
 * @apiGroup Objects
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} prefix - It's root directory
 * 
 * @apiSuccess {String} Key - Object key
 * @apiSuccess {String} LastModified - Date the object was last modified
 * @apiSuccess {Number} Size - object size in bytes
 *
 * @apiSuccessExample Success-Response:
 *  [
 *    {
 *      Key: 'some key',
 *      LastModified: 'some date',
 * 		Size: 0, // some size
 *    }
 *  ]
 */
module.exports.getListObjects = (req, res) => {
	const { prefix } = req.query;
	const { s3Client, bucket } = s3;
	
	const params = {
		Bucket: bucket,
		Prefix: prefix,
	};

	s3Client.listObjects(params, (err, data) => {
		if (err) {
			return res.status(500).json({error: `Error: ${err}`});
		}

		if (!(data && data.Contents && Array.isArray(data.Contents))) {
			return res.status(500).json({error: `Error: Response doesn't contain objects`});
		}

		// Correction data for secure 
		const result = data.Contents.map(x => ({
			Key: x.Key,
			LastModified: x.LastModified,
			Size: x.Size,
		  }));

		return res.json(result);
	});
};

/**
 * @api {delete} /api/objects
 * @apiName doRemoveObject
 * @apiGroup Objects
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} key - It's file full name
 * 
 * @apiSuccess {String} message
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    message: 'The object was deleted successfully',
 *  }
 */
exports.doRemoveObject = (req, res) => {
	const { query: {key}} = req;
	const { s3Client, bucket } = s3;

	var params = {
		Bucket: bucket, 
		Key: key
	   };

	s3Client.deleteObject(params, (err, data) => {
		if (err) {
			return res.status(500).json({error: `Error: ${err}`});
		}

		return res.json({message: `The object was deleted successfully`});

	});
}