using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAppWeek3.Models.EntitiesContext
{
    public class Character
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Content { get; set; }

        public string ImagePath { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        [ForeignKey("IdentityUser")]
        public string UserId { get; set; }

        public virtual Category Category {get;set;}

        public virtual ICollection<Comment> Comments { get; set; }

        public virtual IdentityUser IdentityUser { get; set; }
    }
}
