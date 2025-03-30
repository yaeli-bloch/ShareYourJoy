using Microsoft.AspNetCore.Mvc;
using Server.Core.Services;
using Server.Core.Models;
using Server.API.ModelsDto;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IFileService _FileService;

        public FilesController(IFileService FileService)
        {
            _FileService = FileService;
        }       

        [HttpGet]
        public async Task<IActionResult> GetAllFiles()
        {
            var orderFiles = await _FileService.GetAllFilesAsync();
            return Ok(orderFiles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFileById(int id)
        {
            var oFile = await _FileService.GetFileAsync(id);
            if (oFile == null)
                return NotFound();
            return Ok(oFile);
        }
        [HttpPost]
        public async Task<IActionResult> AddFile([FromBody] FileDTO orderFile)
        {
            if (orderFile == null)
                return BadRequest();
            var FileToAdd=new OFile {Title = orderFile.Title,FileUrl=orderFile.FileUrl
            ,CreatedAt=orderFile.CreatedAt,UpdatedAt=orderFile.UpdatedAt,UserId=orderFile.UserId,GroupId=orderFile.GroupId};
            await _FileService.AddFileAsync(FileToAdd);
             return   Ok(orderFile);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFile(int id, [FromBody] OFile orderFile)
        {
            if (id != orderFile.Id)
                return BadRequest();
            await _FileService.UpdateFileAsync(orderFile);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            await _FileService.DeleteFileAsync(id);
            return NoContent();
        }
    }
}
