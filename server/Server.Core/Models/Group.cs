using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }        
        public string Password { get; set; }        
        public List<GroupUser> Users { get; set; } = new List<GroupUser>();
        public int AdminId { get; set; }
        public string AdminPassword { get; set; }
        [JsonIgnore]
        public List<OFile> Files { get; set; } = new List<OFile> ();
    }
}
