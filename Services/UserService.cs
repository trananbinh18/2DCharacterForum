using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ReactAppWeek3.Services
{
    public interface IUserService
    {
        Task<IdentityUser> Authenticate(string email, string password);
        IEnumerable<IdentityUser> GetAll();
        IdentityUser GetById(string id);
    }

    public class UserService : IUserService
    {
        UserManager<IdentityUser> _userManager;
        RoleManager<IdentityRole> _roleManager;
        AppSetting _appSetting;

        public UserService(IOptions<AppSetting> appSettings, UserManager<IdentityUser> um, RoleManager<IdentityRole> rm)
        {
            _userManager = um;
            _roleManager = rm;
            _appSetting = appSettings.Value;
        }

        public async Task<IdentityUser> Authenticate(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return null;
            }
            else
            {
                var isPasswordRight = await _userManager.CheckPasswordAsync(user, password);
                if (!isPasswordRight)
                {
                    return null;
                }
            }


            var roles = await _userManager.GetRolesAsync(user);



            List<Claim> listClaim = new List<Claim>();

            foreach (string role in roles)
            {
                listClaim.Add(new Claim(ClaimTypes.Role, role));
            }

            listClaim.Add(new Claim(ClaimTypes.Name, user.UserName));
            listClaim.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSetting.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(listClaim),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.SecurityStamp = tokenHandler.WriteToken(token);

            return user;
        }

        public IEnumerable<IdentityUser> GetAll()
        {
            return _userManager.Users.ToList();
        }

        public IdentityUser GetById(string id)
        {
            return _userManager.Users.FirstOrDefault(x => x.Id == id);
        }
    }
}
