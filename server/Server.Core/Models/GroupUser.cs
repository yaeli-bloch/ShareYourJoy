using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public enum UserRole
    {
        Admin,
        User
    }
    public class GroupUser
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int UserId { get; set; }
        public UserRole Role { get; set; }       
        public Group Group { get; set; } 
       
    }

}
