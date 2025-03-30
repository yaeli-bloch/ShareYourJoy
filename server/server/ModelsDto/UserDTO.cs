using Microsoft.Identity.Client;
using Server.Core.Models;

namespace Server.API.ModelsDto
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; } // שם פרטי
        public string LastName { get; set; }
        public string PreviousLastName { get; set; } 
        public int NumberOfChildren { get; set; } 
        public string Email { get; set; }
        public string Password { get; set; }        
        public UserRole Role { get; set; }
       
    }
}
