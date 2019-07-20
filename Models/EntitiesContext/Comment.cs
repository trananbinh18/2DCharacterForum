using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAppWeek3.Models.EntitiesContext
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }


        public DateTime CreateDate { get; set; } = DateTime.Now;

        [ForeignKey("Character")]
        public int CharacterId { get; set; }

        [ForeignKey("IdentityUser")]
        public string UserId { get; set; }

        public virtual Character Character {get;set;}

        public virtual IdentityUser User { get; set; }


    }
}
