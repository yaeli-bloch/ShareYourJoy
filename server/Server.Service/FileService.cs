using Server.Core.Models;
using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service
{
    public class FileService:IFileService
    {
        private readonly IFileRepository _FileRepository;

        public FileService(IFileRepository FileRepository)
        {
            _FileRepository = FileRepository;
        }

        public async Task<OFile> GetFileAsync(int id)
        {
            return await _FileRepository.GetFileByIdAsync(id);
        }

        public async Task<IEnumerable<OFile>> GetAllFilesAsync()
        {
            return await _FileRepository.GetAllFilesAsync();
        }

        public async Task AddFileAsync(OFile oFile)
        {
            // כאן תוכל להוסיף לוגיקה נוספת אם צריך לפני ההוספה
            await _FileRepository.AddFileAsync(oFile);
        }

        public async Task UpdateFileAsync(OFile oFile)
        {
            // אפשר להוסיף כאן לוגיקה לעדכון
            await _FileRepository.UpdateFileAsync(oFile);
        }

        public async Task DeleteFileAsync(int id)
        {
            await _FileRepository.DeleteFileAsync(id);
        }
    }
}
