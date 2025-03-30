//using Microsoft.AspNetCore.Mvc;
//using Server.Core.Models;
//using Server.Core.Services;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace Server.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class GroupUserController : ControllerBase
//    {
//        private readonly IGroupUserService _groupUserService;

//        public GroupUserController(IGroupUserService groupUserService)
//        {
//            _groupUserService = groupUserService;
//        }

//        // הוספת משתמש לקבוצה
//        [HttpPost("addUserToGroup")]
//        public async Task<ActionResult> AddUserToGroup(int userId, int groupId, [FromQuery] UserRole role)
//        {
//            try
//            {
//                await _groupUserService.AddUserToGroupAsync(userId, groupId, role);
//                return Ok(new { Message = "User added to group successfully." });
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(new { Message = ex.Message });
//            }
//        }

//        // מחיקת משתמש מקבוצה
//        [HttpDelete("removeUserFromGroup")]
//        public async Task<ActionResult> RemoveUserFromGroup(int userId, int groupId)
//        {
//            try
//            {
//                await _groupUserService.RemoveUserFromGroupAsync(userId, groupId);
//                return Ok(new { Message = "User removed from group successfully." });
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(new { Message = ex.Message });
//            }
//        }

//        // שליפת כל המשתמשים בקבוצה
//        [HttpGet("getUsersInGroup/{groupId}")]
//        public async Task<ActionResult<List<GroupUser>>> GetGroupUsers(int groupId)
//        {
//            try
//            {
//                var usersInGroup = await _groupUserService.GetGroupUsersAsync(groupId);
//                return Ok(usersInGroup);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(new { Message = ex.Message });
//            }
//        }
//    }
//}
