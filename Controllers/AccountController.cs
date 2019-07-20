using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactAppWeek3.Services;
using Newtonsoft.Json;
using System.Text;

using Microsoft.AspNetCore.Identity;
using System.Text.RegularExpressions;

namespace ReactAppWeek3.Controllers
{
    public class AccountController : Controller
    {
        IUserService _userService;
        UserManager<IdentityUser> _userManager;

        public AccountController(IUserService userService,UserManager<IdentityUser> userManager)
        {
            _userService = userService;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromForm] string email, [FromForm] string password)
        {
            var user = await _userService.Authenticate(email, password);
            if(user == null)
            {
                return BadRequest(new { message="Can't Login you should check your login information."});
            }

            //string userJsonString = JsonConvert.SerializeObject(user, Formatting.Indented);
            //Response.Cookies.Append("currentuser", userJsonString);
            Response.Cookies.Append("token", user.SecurityStamp.ToString());            

            return Ok(user);
        }


        [HttpPost]
        public async Task<IActionResult> Register([FromForm] string email, [FromForm] string password, [FromForm] string username)
        {
            try
            {
                var user = new IdentityUser() { UserName = username, Email = email };

                var result = await _userManager.CreateAsync(user, password);

                if (result.Succeeded)
                {
                    Response.Cookies.Append("token", user.SecurityStamp.ToString());
                    return await Login(email, password);
                }
                else
                {
                    string message = "";

                    foreach (var item in result.Errors)
                    {
                        message += item.Description + "\n";
                    }
                    return BadRequest(new { message = message });
                }

            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Can't Login you should check your login information." });
            }
            


            

            //string userJsonString = JsonConvert.SerializeObject(user, Formatting.Indented);
            //Response.Cookies.Append("currentuser", userJsonString);

            
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public string GetString()
        {
            
            return "Hello Binh Tran";
        }

        [Authorize(Roles = "Admin")]
        public bool isHaveRoleAdmin()
        {
            return true;
        }
    }
}