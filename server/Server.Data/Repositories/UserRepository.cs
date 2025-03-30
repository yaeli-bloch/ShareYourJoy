using Server.Core.Models;
using Server.Core.Repositories;
using Microsoft.EntityFrameworkCore;
namespace Server.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Users> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<Users> GetUserByMail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.Equals(email));
            return user;

        }
        public async Task<IEnumerable<Users>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }
        public async Task<IEnumerable<Group>> GetUserGroupsByUserIdAsync(int userId)
        {
            var groups = await _context.Users
                .Where(user => user.Id == userId)  // חפש את המשתמש הספציפי
                .Include(user => user.Groups)      // כלול את ה-GroupUser (הקשר בין משתמשים לקבוצות)
                .ThenInclude(groupUser => groupUser.Group) // כלול את הקבוצה עצמה מתוך GroupUser
                .SelectMany(user => user.Groups)  // עבור על כל ה-GroupUser של המשתמש
                .Select(groupUser => groupUser.Group)  // שלוף את ה-Group עצמו
                .ToListAsync();

            return groups;
        }
        public async Task AddGroupForUserAsync(GroupUser groupForUser, int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (user != null)
            {
                user.Groups.Add(groupForUser);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<Users> AddUserAsync(Users user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<Users> UpdateUserAsync(Users user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await GetUserByIdAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}

