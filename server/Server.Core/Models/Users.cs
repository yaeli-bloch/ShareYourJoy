using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public class Users
    {       
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PreviousLastName { get; set; }
        public int NumberOfChildren { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }        
        public List<OFile> Files { get; set; }=new List<OFile>();
        public List<GroupUser> Groups { get; set; } = new List<GroupUser>();
        
    }
}
