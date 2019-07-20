using Microsoft.AspNetCore.Http;
using ReactAppWeek3.Models.EntitiesContext;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAppWeek3.Models.ViewModel
{
    public class ModelCreateCharacterView
    {
       
        [Required(ErrorMessage ="Không có tên nhân vật hông tạo được")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Không có mô tả hông tạo được")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Không có nội dung nhân vật hông tạo được")]
        public string Content { get; set; }

        [Required(ErrorMessage = "Không có hình nhân vật hông tạo được")]
        public IFormFile Image { get; set; }

        [ForeignKey("Category")]
        [Required(ErrorMessage = "Không có loại nhân vật hông tạo được")]
        public int CategoryId { get; set; }



    }
}
