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
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _context.FindReview(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }
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

        [HttpGet("average/{id}")]
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
        [HttpDelete("{id}")]
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

        [HttpGet("voorstelling/{id}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetVoorstellingReviews(int id)
        {
            var voorstellingReviews = _context.GetReview()
                .Where(r => r.VoorstellingId == id)
                .ToList();

            if (voorstellingReviews.Count == 0)
            {
                return NotFound("Geen reviews voor deze voorstelling");
            }

            return Ok(voorstellingReviews);
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
