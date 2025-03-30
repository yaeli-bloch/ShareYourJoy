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
    public class UserService:IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<IEnumerable<Users>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUsersAsync();
        }
        public async Task<Users> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }
        public async Task<Users> GetUserByMail(string email)
        {
            return await _userRepository.GetUserByMail(email);
        }
        public async Task<IEnumerable<Group>> GetUserGroupsAsync(int userId)
        {
            // קריאה ל-Repository כדי לשלוף את הקבוצות שהמשתמש שייך אליהם
            var userGroups = await _userRepository.GetUserGroupsByUserIdAsync(userId);
            return userGroups;
        }
        public async Task<IEnumerable<Users>> GetUsersByGroupIdAsync(int groupId)
        {
            // קריאה למתודה מהריפוזיטורי
            return await _userRepository.GetUsersByGroupIdAsync(groupId);
        }
        public async Task<Users> CreateUserAsync(Users user)
        {
            return await _userRepository.AddUserAsync(user);
        }

        public async Task<Users> UpdateUserAsync(Users user)
        {
            return await _userRepository.UpdateUserAsync(user);
        }

        public async Task DeleteUserAsync(int id)
        {
            await _userRepository.DeleteUserAsync(id);
        }
    }
}
