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
            return await _context.Review.ToListAsync();
        }

        // GET: api/Review/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _context.Review.FindAsync(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        // PUT: api/Review/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(int id, Review review)
        {
            if (id != review.id)
            {
                return BadRequest();
            }

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Review
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(ReviewDTO reviewDTO)
        {
            var existingReview = await _context.Review
                .Where(r => r.gebruikerId == reviewDTO.gebruikerId)
                .Where(r => r.voorstellingId == reviewDTO.voorstellingId)
                .FirstOrDefaultAsync();

            if (existingReview != null)
            {
                return BadRequest("You have already posted a review for this voorstelling");
            }

            if (reviewDTO.sterren < 0 || reviewDTO.sterren > 5)
            {
                return BadRequest("Je mag alleen maar tussen de 0 en 5 sterren geven.");
            }
            var review = new Review()
            {
                recensie = reviewDTO.recensie,
                sterren = reviewDTO.sterren,
                Gebruiker = await _context.FindGebruiker(reviewDTO.gebruikerId),
                Voorstelling = await _context.FindVoorstelling(reviewDTO.voorstellingId)
            };
            _context.Review.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReview", new { id = review.id }, review);
        }
        
        [HttpGet("average/{id}")]
        public async Task<ActionResult<double>> GetAverageReviewRating(int id)
        {
            var voorstellingReviews = await _context.Review
                .Where(r => r.voorstellingId == id)
                .ToListAsync();

            if (voorstellingReviews.Count == 0)
            {
                return NotFound("No reviews found for this voorstelling");
            }

            var averageRating = voorstellingReviews.Average(r => r.sterren);

            return Ok(averageRating);
        }

        // DELETE: api/Review/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Review.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Review.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return _context.Review.Any(e => e.id == id);
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
