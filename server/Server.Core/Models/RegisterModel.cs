using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public  class RegisterModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PreviousLastName { get; set; }
        public int NumberOfChildren { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
