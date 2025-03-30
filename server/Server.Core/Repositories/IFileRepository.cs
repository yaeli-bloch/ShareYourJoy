using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public interface IFileRepository
    {
        Task<OFile> GetFileByIdAsync(int id);
        Task<IEnumerable<OFile>> GetAllFilesAsync();
        Task AddFileAsync(OFile orderFile);
        Task UpdateFileAsync(OFile orderFile);
        Task DeleteFileAsync(int id);
    }
}
