// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.IO;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Net.Http.Headers;
// using WDPR.Models;
//
// namespace WDPR.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class ImageController : ControllerBase
//     {
//         private readonly DbTheaterLaakContext _context;
//
//         public ImageController(DbTheaterLaakContext context)
//         {
//             _context = context;
//         }
//
//         private string GetType(string path)
//         {
//             var types = GetMimeTypes();
//             var ext = Path.GetExtension(path).ToLowerInvariant();
//             return types[ext];
//         }
//         
//         private Dictionary<string, string> GetMimeTypes()
//         {
//             return new Dictionary<string, string>
//             {
//                 {".txt", "text/plain"},
//                 {".pdf", "application/pdf"},
//                 {".doc", "application/vnd.ms-word"},
//                 {".docx", "application/vnd.ms-word"},
//                 {".xls", "application/vnd.ms-excel"},
//                 {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
//                 {".png", "image/png"},
//                 {".jpg", "image/jpeg"},
//                 {".jpeg", "image/jpeg"},
//                 {".gif", "image/gif"},
//                 {".csv", "text/csv"}
//             };
//         }
//         
//         [HttpGet("{filename}")]
//         public IActionResult GetImage(string filename) {
//             var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filename);
//             var memory = new MemoryStream();
//             using (var stream = new FileStream(path, FileMode.Open))
//             {
//                 stream.CopyToAsync(memory);
//             }
//             memory.Position = 0;
//             return File(memory, GetType(path), Path.GetFileName(path));
//         }
//         [HttpPost, DisableRequestSizeLimit]
//         public IActionResult UploadFile(IFormFile file)
//         {
//             try
//             {
//                 // Get the file name
//                 var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
//                 // Get the folder path
//                 var folderPath = Path.Join("path", "to", "save", "the", "file");
//                 // Get the full path
//                 var fullPath = Path.Combine(fileName, folderPath);
//                 // Check if the folder exists, if not create it
//                 if (!Directory.Exists(folderPath))
//                 {
//                     Directory.CreateDirectory(folderPath);
//                 }
//                 // Save the file
//                 using (var stream = new FileStream(fullPath, FileMode.Create))
//                 {
//                     file.CopyTo(stream);
//                 }
//                 return Ok("File uploaded successfully.");
//             }
//             catch (Exception ex)
//             {
//                 return BadRequest(ex.Message);
//             }
//         }
//         
//         [HttpDelete("{filename}")]
//         public IActionResult DeleteImage(string filename)
//         {
//             var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filename);
//             if (System.IO.File.Exists(path))
//             {
//                 System.IO.File.Delete(path);
//             }
//             return Ok();
//         }
//         
//     }
// }
