using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactAppWeek3.Models.EntitiesContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAppWeek3.Data
{
    public class EntitiesContext : IdentityDbContext<IdentityUser, IdentityRole,string>
    {
        public EntitiesContext(DbContextOptions<EntitiesContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Character> Characters { get; set; }
        public DbSet<Comment> Comments { get; set; }



    }
}
