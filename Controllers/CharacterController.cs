using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Mvc;
using ReactAppWeek3.Data;
using ReactAppWeek3.Models.ViewModel;
using ReactAppWeek3.Lib;
using ReactAppWeek3.Models.EntitiesContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace ReactAppWeek3.Controllers
{
    public class CharacterController : Controller
    {
        EntitiesContext _dbContext;
        IHostingEnvironment _hostingEnvironment;
        UserManager<IdentityUser> _userManager;
        public CharacterController(EntitiesContext db, IHostingEnvironment he, UserManager<IdentityUser> um)
        {
            _dbContext = db;
            _hostingEnvironment = he;
            _userManager = um;
        }

        public JsonResult GetListCharacter()
        {
            var listCharacter = _dbContext.Characters.ToList();
            return Json(listCharacter);
        }

        public JsonResult GetCharacter(int id)
        {
            var character = _dbContext.Characters.Find(id);
            return Json(new { Name = character.Name,
                Description = character.Description,
                Content = character.Content,
                Catelogy = character.Category.Name,
                ImagePath = character.ImagePath,
                Author = character.IdentityUser.UserName
            });
        }

        
        [Authorize(Roles = "Admin")]
        public async Task<JsonResult> CreateCharacter(ModelCreateCharacterView model) {
            if (ModelState.IsValid)
            {
                string imagePath = Library.UploadFile(model.Image, _hostingEnvironment);

                Character character = new Character();
                character.CategoryId = model.CategoryId;
                character.Content = model.Content;
                character.Description = model.Description;
                character.Name = model.Name;
                character.ImagePath = imagePath;
                var user = await _userManager.GetUserAsync(User);

                
                if(user != null)
                {
                    character.UserId = user.Id;
                    _dbContext.Characters.Add(character);
                    _dbContext.SaveChanges();
                }
                else
                {
                    return Json(new { status = "fail", message = "Create character fail"});

                }

                return Json(new { status= "success", message="Create character success" });
                
            }
            else
            {
                var listError = ModelState.Select(x => x.Value).ToList();
                return Json(new { status = "fail", message = "Create character fail" ,listError = listError});

            }
        }

        public JsonResult GetAllCategory()
        {
            var listCategory = _dbContext.Categories.Select(x => new { x.Id, x.Name}).ToList();
            return Json(listCategory);
        }
        
    }
}