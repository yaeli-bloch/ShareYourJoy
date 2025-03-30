using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public interface IGroupRepository
    {
        Task<Group> GetGroupByIdAsync(int id);
        Task<Group> GetGroupByPasswordAsync(string password);
        Task<IEnumerable<Group>> GetAllGroupsAsync();
        Task<int> CreateGroupAsync(Group group);
        Task AddUserForGroupAsync(GroupUser userForGroup, int groupId);
        Task<Group> UpdateGroupAsync(Group group);
        Task DeleteGroupAsync(int id);
    }
}
