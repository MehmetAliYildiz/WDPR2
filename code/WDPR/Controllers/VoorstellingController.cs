using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Models;
using WDPR.Data;

    [Route("api/[controller]")]
    [ApiController]
    public class VoorstellingController : ControllerBase
    {
        private readonly IDbTheaterLaakContext _context;

        public VoorstellingController(IDbTheaterLaakContext context)
        {
            _context = context;
        }

        // GET: api/Voorstelling
        [HttpGet]
        public ActionResult<IEnumerable<Voorstelling>> GetVoorstelling()
        {
            return _context.GetVoorstellingen().ToList();
        }

        // GET: api/Voorstelling/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Voorstelling>> GetVoorstelling(int id)
        {
            var voorstelling = await _context.FindVoorstelling(id);

            if (voorstelling == null)
            {
                return NotFound();
            }

            return voorstelling;
        }

        // PUT: api/Voorstelling/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{Id}")]
        //public async Task<IActionResult> PutVoorstelling(int Id, Voorstelling voorstelling)
        //{
        //    if (Id != voorstelling.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(voorstelling).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!VoorstellingExists(Id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        [HttpPost]
        public async Task<ActionResult<Voorstelling>> PostVoorstelling(VoorstellingDTO voorstellingDTO)
        {
            var voorstelling = new Voorstelling()
            {
                Name = voorstellingDTO.Name,
                beschrijving = voorstellingDTO.beschrijving,
                Img = voorstellingDTO.Img
            };
            _context.AddVoorstelling(voorstelling);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVoorstelling", new { id = voorstelling.Id }, voorstelling);
        }

        // DELETE: api/Voorstelling/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoorstelling(int id)
        {
            var voorstelling = await _context.FindVoorstelling(id);
            if (voorstelling == null)
            {
                return NotFound();
            }

            _context.RemoveVoorstelling(id);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAlleVoorstellingen()
        {
            var voorstellingen = _context.GetVoorstellingen();
            _context.RemoveVoorstellingRange(voorstellingen);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        

        private bool VoorstellingExists(int id)
        {
            return _context.GetVoorstellingen().Any(e => e.Id == id);
        }
        
        public class VoorstellingDTO
        {
            [Key]
            public int Id { get; set; }
            public string Name { get; set; }
            public string beschrijving{ get; set; }
            public string Img { get; set; }
        }
    }