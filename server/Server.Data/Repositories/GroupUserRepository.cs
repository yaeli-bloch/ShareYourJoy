//using Microsoft.EntityFrameworkCore;
//using Server.Core.Models;
//using Server.Core.Repositories;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Server.Data.Repositories
//{
//    public class GroupUserRepository :IGroupUserRepository
//    {
//        private readonly DataContext _context;

//        public GroupUserRepository(DataContext context)
//        {
//            _context = context;
//        }

//        public async Task<GroupUser> GetAsync(int groupId, int userId)
//        {
//            return await _context.GroupUsers
//                .FirstOrDefaultAsync(gu => gu.GroupId == groupId && gu.UserId == userId);
//        }

//        public async Task AddAsync(GroupUser groupUser)
//        {
//            await _context.GroupUsers.AddAsync(groupUser);
//            await _context.SaveChangesAsync();
//        }

//        public async Task RemoveAsync(GroupUser groupUser)
//        {
//            _context.GroupUsers.Remove(groupUser);
//            await _context.SaveChangesAsync();
//        }

//        public async Task<List<GroupUser>> GetByGroupIdAsync(int groupId)
//        {
//            return await _context.GroupUsers
//                .Where(gu => gu.GroupId == groupId)
//                .ToListAsync();
//        }
//    }
//}
