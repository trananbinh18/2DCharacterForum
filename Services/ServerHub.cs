using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using ReactAppWeek3.Data;

namespace ReactAppWeek3.Services
{
    public class ServerHub : Hub
    {
        EntitiesContext _dbContext;
        public ServerHub(EntitiesContext db):base()
        {
            _dbContext = db;
        }

        public async Task CommentAdded(int CharacterId)
        {
            var listComment = _dbContext.Comments.OrderByDescending(x => x.CreateDate).Where(x => x.CharacterId == CharacterId).Select(x => new { userName = x.User.UserName, content = x.Content, createDate = x.CreateDate.ToString("dd/mm/yy , hh:mm") }).ToList();
            await Clients.All.SendAsync("UpdateComments", listComment);
        }
    }
}
