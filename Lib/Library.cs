using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAppWeek3.Lib
{
    public class Library
    {
        public static string UploadFile(IFormFile upload, IHostingEnvironment hostingEnvironment)
        {
            var fileName = DateTime.Now.ToString("yyyyMMddHHmmss") + upload.FileName;
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), hostingEnvironment.WebRootPath, "images", fileName);
            var fileStream = new FileStream(filePath, FileMode.Create);
            upload.CopyTo(fileStream);
            fileStream.Dispose();

            string Url = "/images/" + fileName;
            return Url;
        }
    }
}
