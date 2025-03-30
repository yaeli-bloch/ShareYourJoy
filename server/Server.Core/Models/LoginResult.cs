using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public class LoginResult
    {
        public string Token { get; set; }
        public Users User { get; set; } 
    }
}
