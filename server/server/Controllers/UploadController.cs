using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/upload")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName; 

        public UploadController(IAmazonS3 s3Client,IConfiguration configuration)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:S3BucketName"]; 
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName, 
                Key = fileName,   
                Verb = HttpVerb.PUT,              // מבצע PUT (שימוש בהעלאת קובץ)
                Expires = DateTime.UtcNow.AddMinutes(5),  // הקישור יפוג אחרי 5 דקות
                ContentType = "image/jpeg" 
            };

            string url = _s3Client.GetPreSignedURL(request); // קבלת ה-URL
            return Ok(new { url }); // מחזירים את ה-URL
        }
        [HttpGet("download-url")]
        public async Task<string> GetDownloadUrlAsync(string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(30) 
            };

            return _s3Client.GetPreSignedURL(request);
        }
    }
}
