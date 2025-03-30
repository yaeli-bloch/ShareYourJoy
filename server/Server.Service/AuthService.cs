using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Server.Core.Models;
using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Server.Service
{
    public class AuthService :IAuthService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        public AuthService(IGroupRepository groupRepository, IUserRepository userRepository, IConfiguration configuration)
        {
            _groupRepository = groupRepository;
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<string> RegisterAsync(RegisterModel registerModel)
        {
            // קודם כל נוודא אם כבר יש משתמש עם אותו דואר אלקטרוני
            var existingUser = await _userRepository.GetUserByMail(registerModel.Email);
            if (existingUser != null)
            {
                throw new Exception("User with this email already exists.");
            }

            // יצירת משתמש חדש
            var newUser = new Users
            {
                FirstName = registerModel.FirstName,
                LastName = registerModel.LastName,
                Email = registerModel.Email,
                Password = registerModel.Password, 
                NumberOfChildren = registerModel.NumberOfChildren,
                PreviousLastName = registerModel.PreviousLastName,
            };

            // שמירת המשתמש החדש בבסיס הנתונים
            await _userRepository.AddUserAsync(newUser);

            // יצירת טוקן JWT עבור המשתמש החדש
            return GenerateJwtToken(newUser);
        }
        public async Task<LoginResult> LoginAsync(Login login)
        {                 
            var user = await _userRepository.GetUserByMail(login.Email);           
            if (user == null|| user.Password!=login.Password)
            {
                throw new Exception("User not found in group");
            }            
            var token = GenerateJwtToken(user);  // כאן תיצור את ה-Token
             return new LoginResult
             {
                Token = token,
                 User = user
            };
        }
        private string GenerateJwtToken(Users user)
        {
            // קריאה להגדרות הטוקן מהקובץ settings
            var jwtSettings = _configuration.GetSection("JwtSettings");

            // יצירת מפתח סודי לשימוש בחתימה על הטוקן
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // יצירת הטוקן
            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],  // קביעת ה-Issuer
                audience: jwtSettings["Audience"], // קביעת ה-Audience
                claims: new[] {
            new Claim(ClaimTypes.Name, user.Email),  // שדה השם (או המייל)
            new Claim("id", user.Id.ToString()) // הוספת ה-ID של המשתמש כ-Claim
                },
                expires: DateTime.Now.AddHours(1),  // הגדרת תוקף של הטוקן (שעה)
                signingCredentials: credentials  // החתימה על הטוקן
            );

            // מחזירים את הטוקן כ-string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
