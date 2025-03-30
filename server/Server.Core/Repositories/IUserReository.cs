using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public interface IUserRepository
    {
        Task AddGroupForUserAsync(GroupUser groupForUser, int userId);
        Task<Users> GetUserByIdAsync(int id);
        Task<IEnumerable<Users>> GetAllUsersAsync();
        Task<IEnumerable<Group>> GetUserGroupsByUserIdAsync(int userId);
        Task<IEnumerable<Users>> GetUsersByGroupIdAsync(int groupId);
        Task<Users> AddUserAsync(Users user);
        Task<Users> UpdateUserAsync(Users user);
        Task DeleteUserAsync(int id);
        Task<Users> GetUserByMail(string email);
    }
}
