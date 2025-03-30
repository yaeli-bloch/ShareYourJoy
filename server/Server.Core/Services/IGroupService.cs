using Server.Core.Models;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface IGroupService
    {
        Task<Group> GetGroupByIdAsync(int id);
        Task<Group> GetGroupByPasswordAsync(string password);
        Task<IEnumerable<Group>> GetAllGroupsAsync();
        Task<int> CreateGroupAsync(Group group);        
        Task<Group> UpdateGroupAsync(Group group);
        Task DeleteGroupAsync(int id);
        Task<string> LoginAsync(Login login);
    }
}
