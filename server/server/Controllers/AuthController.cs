using Microsoft.AspNetCore.Mvc;
using Server.Core.Models;
using Server.Core.Services;
using Server.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthService _authService;
        public AuthController(IAuthService AuthService)
        {
            _authService = AuthService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            if (registerModel == null || string.IsNullOrEmpty(registerModel.Email) || string.IsNullOrEmpty(registerModel.Password))
            {
                return BadRequest("Email or password is missing.");
            }

            try
            {
                var token = await _authService.RegisterAsync(registerModel);

                return Ok(new { Token = token }); // מחזירים את הטוקן
            }
            catch (Exception ex)
            {
                // אם קרתה שגיאה
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            if (login == null || string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
            {
                return BadRequest("Email or password is missing.");
            }

            try
            {
                var result = await _authService.LoginAsync(login);

                // אם ה-token לא התקבל או שווה ל-null
                if (result == null || string.IsNullOrEmpty(result.Token))
                {
                    return Unauthorized(new { Message = "Invalid email or password." });
                }

                return Ok(new { Token = result.Token, User = result.User });
            }
            catch (Exception ex)
            {
                // הדפסת השגיאה בשרת
                Console.WriteLine(ex.Message);
                return Unauthorized(new { Message = ex.Message });
            }
        }
    }
}
