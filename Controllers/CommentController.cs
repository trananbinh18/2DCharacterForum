using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReactAppWeek3.Data;
using ReactAppWeek3.Models.EntitiesContext;
using ReactAppWeek3.Services;

namespace ReactAppWeek3.Controllers
{
    public class CommentController : Controller
    {
        EntitiesContext _dbContext;
        UserManager<IdentityUser> _userManager;

        public CommentController(EntitiesContext db, UserManager<IdentityUser> um)
        {
            _dbContext = db;
            _userManager = um;
        }

        public JsonResult GetCommentByCharacter(int id)
        {
            var comments = _dbContext.Comments.OrderByDescending(x => x.CreateDate).Where(x => x.CharacterId == id).Select(x => new { userName = x.User.UserName, content = x.Content, createDate = x.CreateDate.ToString("dd/mm/yy , hh:mm")}).ToList();

            return Json(comments);
        }

        
        [Authorize]
        [HttpPost]
        public async Task<JsonResult> AddComment([FromBody]Comment comment)
        {
            if(comment.Content != null && comment.Content != "" && comment.CharacterId != 0)
            {

                var user = await _userManager.GetUserAsync(User);
                comment.UserId = user.Id;

                _dbContext.Comments.Add(comment);
                _dbContext.SaveChanges();

                return Json(new { status = 200 });
            }

            return Json(new { status = 400 });
        }
    }
}