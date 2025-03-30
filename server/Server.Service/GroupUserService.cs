//using Server.Core.Models;
//using Server.Core.Repositories;
//using Server.Core.Services;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Server.Service
//{
//    public class GroupUserService :IGroupUserService
//    {
//        private readonly IGroupUserRepository _groupUserRepository;

//        public GroupUserService(IGroupUserRepository groupUserRepository)
//        {
//            _groupUserRepository = groupUserRepository;
//        }

//        public async Task AddUserToGroupAsync(int userId, int groupId, UserRole role)
//        {
//            var existingGroupUser = await _groupUserRepository.GetAsync(groupId, userId);
//            if (existingGroupUser != null)
//            {
//                throw new Exception("User is already part of the group.");
//            }

//            var groupUser = new GroupUser
//            {
//                GroupId = groupId,
//                UserId = userId,
//                Role = role
//            };

//            await _groupUserRepository.AddAsync(groupUser);
//        }

//        public async Task RemoveUserFromGroupAsync(int userId, int groupId)
//        {
//            var groupUser = await _groupUserRepository.GetAsync(groupId, userId);
//            if (groupUser == null)
//            {
//                throw new Exception("User is not part of the group.");
//            }

//            await _groupUserRepository.RemoveAsync(groupUser);
//        }

//        public async Task<List<GroupUser>> GetGroupUsersAsync(int groupId)
//        {
//            return await _groupUserRepository.GetByGroupIdAsync(groupId);
//        }
//    }
//}
