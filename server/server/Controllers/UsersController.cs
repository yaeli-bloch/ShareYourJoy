using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.API.ModelsDto;
using Server.Core.Models;
using Server.Core.Services;
using System.Data;

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // נתיב לקבלת משתמש לפי ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // נתיב לקבלת כל המשתמשים
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        // נתיב לקבלת משתמש לפי מייל (לא חופף יותר ל-GetUser)
        [HttpGet("email/{email}")]
        //[Authorize(Roles = "User")]
        public async Task<ActionResult<Users>> GetUserEmailByEmailAsync(string email)
        {
            var user = await _userService.GetUserByMail(email);
            if (user == null)
            {
                return NotFound("No user with email " + email);
            }
            return Ok(user);
        }
        [HttpGet("{userId}/groups")]
        public async Task<ActionResult<IEnumerable<Group>>> GetGroupsByUserIdAsync(int userId)
        {
            // קריאה לשירות כדי לשלוף את הקבוצות לפי ה-userId
            var userGroups = await _userService.GetUserGroupsAsync(userId);

            if (userGroups == null || !userGroups.Any())
            {
                return NotFound("No groups found for this user.");
            }

            return Ok(userGroups);
        }
        [HttpGet("byGroup/{groupId}")]
        public async Task<IActionResult> GetUsersByGroupId(int groupId)
        {
            var users = await _userService.GetUsersByGroupIdAsync(groupId);
            if (users == null || !users.Any())
            {
                return NotFound("לא נמצאו משתמשים לקבוצה זו.");
            }
            return Ok(users);
        }
        // נתיב יצירת משתמש
        [HttpPost]
        public async Task<ActionResult<Users>> CreateUser(UserDTO user)
        {
            var userToAdd = new Users
            {
                Id = user.Id,
                LastName = user.LastName,
                FirstName = user.FirstName,
                PreviousLastName = user.PreviousLastName,
                NumberOfChildren = user.NumberOfChildren,
                Email = user.Email,
                Password = user.Password,
                
            };

            var createdUser = await _userService.CreateUserAsync(userToAdd);
            return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
        }

        // נתיב עדכון משתמש
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, Users user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            await _userService.UpdateUserAsync(user);
            return NoContent();
        }

        // נתיב מחיקת משתמש
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
