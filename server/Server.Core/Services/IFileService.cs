using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface IFileService
    {
        Task<OFile> GetFileAsync(int id);
        Task<IEnumerable<OFile>> GetAllFilesAsync();
        Task AddFileAsync(OFile orderFile);
        Task UpdateFileAsync(OFile orderFile);
        Task DeleteFileAsync(int id);
    }
}
