using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface IUserService
    {
        Task<Users> GetUserByIdAsync(int id);
        Task<IEnumerable<Users>> GetAllUsersAsync();
        Task<IEnumerable<Group>> GetUserGroupsAsync(int userId);
        Task<Users> CreateUserAsync(Users user);
        Task<Users> UpdateUserAsync(Users user);
        Task DeleteUserAsync(int id);   
        Task<Users> GetUserByMail(string email);

    }
}
