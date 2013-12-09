
module.exports.aws = {
	cf_url:process.env.CLOUD_FRONT_URL,
  s3_bucket:process.env.S3_BUCKET,
  s3_key: process.env.S3_KEY,
  s3_secret:process.env.S3_SECRET,
  deceased_image_path:"/deceased/profile/:name",
  deceased_gallery_path:"/deceased/galery/:name",
  ad_image_path:"/ads/:name",
  user_image_path:"users/:name"
}