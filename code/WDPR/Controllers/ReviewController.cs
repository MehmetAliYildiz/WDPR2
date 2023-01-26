using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WDPR.Models;
using WDPR.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace WDPR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IDbTheaterLaakContext _context;

        public ReviewController(IDbTheaterLaakContext context)
        {
            _context = context;
        }

        // GET: api/Review
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReview()
        {
            return _context.GetReview().ToList();
        }

        // GET: api/Review/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _context.FindReview(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        // // PUT: api/Review/5
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{Id}")]
        // public async Task<IActionResult> PutReview(int Id, Review review)
        // {
        //     if (Id != review.Id)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(review).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!ReviewExists(Id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // POST: api/Review
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(ReviewDTO reviewDTO)
        {
            var existingReview = _context.GetReview()
                .Where(r => r.GebruikerId == reviewDTO.gebruikerId)
                .Where(r => r.VoorstellingId == reviewDTO.voorstellingId)
                .FirstOrDefault();

            if (existingReview != null)
            {
                return BadRequest("You have already posted a review for this voorstelling");
            }

            if (reviewDTO.sterren < 0 || reviewDTO.sterren > 5)
            {
                return BadRequest("Je mag alleen maar tussen de 0 en 5 Sterren geven.");
            }
            var review = new Review()
            {
                Recensie = reviewDTO.recensie,
                Sterren = reviewDTO.sterren,
                Gebruiker = await _context.FindGebruiker(reviewDTO.gebruikerId),
                Voorstelling = await _context.FindVoorstelling(reviewDTO.voorstellingId)
            };
            _context.AddReview(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReview", new { id = review.Id }, review);
        }
        
        [HttpGet("average/{Id}")]
        public async Task<ActionResult<double>> GetAverageReviewRating(int id)
        {
            var voorstellingReviews = _context.GetReview()
                .Where(r => r.VoorstellingId == id)
                .ToList();

            if (voorstellingReviews.Count == 0)
            {
                return NotFound("No reviews found for this voorstelling");
            }

            var averageRating = voorstellingReviews.Average(r => r.Sterren);

            return Ok(averageRating);
        }

        // DELETE: api/Review/5
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.FindReview(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.RemoveReview(id);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return _context.GetReview().Any(e => e.Id == id);
        }

        public class ReviewDTO
        {
            [Key] public int id { get; set; }
            public string recensie { get; set; }
            public int sterren { get; set; }
            [ForeignKey("GebruikerId")] public string gebruikerId { get; set; }
            [ForeignKey("VoorstellingId")] public int voorstellingId { get; set; }
        }
    }
}
