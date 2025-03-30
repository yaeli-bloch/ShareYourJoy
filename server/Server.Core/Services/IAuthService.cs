using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface IAuthService
    {
        Task<LoginResult> LoginAsync(Login login);
        Task<string> RegisterAsync(RegisterModel registerModel);
    }
}
