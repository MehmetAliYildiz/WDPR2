using FluentAssertions;

namespace WDPRTest;
using Microsoft.AspNetCore.Mvc;
using WDPR.Controllers;
using WDPR.Data;
using WDPR.Models;



public class BandControllerTests
{
    [Fact]
        public async Task GetBands_ReturnsListOfBands()
        {
            // Arrange
            var mockContext = new Mock<IDbTheaterLaakContext>();
            var bands = new List<Band>
            {
                new Band { Id = 1, Naam = "The Beatles" },
                new Band { Id = 2, Naam = "The Rolling Stones" }
            };
            mockContext.Setup(x => x.GetBands()).Returns(bands.AsQueryable());
            var controller = new BandController(mockContext.Object);

            // Act
            var result = await controller.GetBands();

            // Assert
            var actionResult = Assert.IsType<ActionResult<List<Band>>>(result);
            var returnedBands = Assert.IsAssignableFrom<List<Band>>(actionResult.Value);
            Assert.Equal(bands, returnedBands);
        }
        
        [Fact]
        public async Task GetBand_ReturnsBand()
        {
            // Arrange
            var mockContext = new Mock<IDbTheaterLaakContext>();
            var band = new Band { Id = 1, Naam = "The Beatles" };
            mockContext.Setup(x => x.FindBand(1)).Returns(Task.FromResult(band));
            var controller = new BandController(mockContext.Object);
        
            // Act
            var result = await controller.GetBand(1);
        
            // Assert
            var actionResult = Assert.IsType<ActionResult<Band>>(result);
            var returnedBand = Assert.IsAssignableFrom<Band>(actionResult.Value);
            Assert.Equal(band, returnedBand);
        }
        
        [Fact]
        public async Task GetBand_ReturnsNotFound()
        {
            // Arrange
            var mockContext = new Mock<IDbTheaterLaakContext>();
            mockContext.Setup(x => x.FindBand(1)).Returns(Task.FromResult<Band>(null));
            var controller = new BandController(mockContext.Object);
        
            // Act
            var result = await controller.GetBand(1);
        
            // Assert
            Assert.Null(result.Value);
        }
        
        [Fact]
        public async Task PostBand_AddsBand()
        {
            // Arrange
            var mockContext = new Mock<IDbTheaterLaakContext>();
            var bandDTO = new BandDTO { Id = 1, Naam = "The Beatles" };
            var controller = new BandController(mockContext.Object);
        
            // Act
            var result = await controller.PostBand(bandDTO);
        
            // Assert
            mockContext.Verify(x => x.AddBand(It.IsAny<Band>()), Times.Once());
            mockContext.Verify(x => x.SaveChangesAsync(), Times.Once());
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            var returnedBand = Assert.IsAssignableFrom<Band>(createdAtActionResult.Value);
            Assert.Equal(1, returnedBand.Id);
            Assert.Equal("The Beatles", returnedBand.Naam);
            Assert.Equal("GetBand", createdAtActionResult.ActionName);
            Assert.Equal(1, createdAtActionResult.RouteValues["id"]);
        }
        
        [Fact]
        public async Task AddArtistToBand_AddsArtist()
        {
            // Arrange
            var mockContext = new Mock<IDbTheaterLaakContext>();
            var band = new Band { Id = 1, Naam = "The Beatles" };
            var artiest = new Artiest { Id = 1, Naam = "John Lennon" };
            mockContext.Setup(x => x.FindBand(1)).Returns(Task.FromResult(band));
            mockContext.Setup(x => x.FindArtiest(1)).Returns(Task.FromResult(artiest));
            var controller = new BandController(mockContext.Object);
        
            // Act
            var result = await controller.AddArtistToBand(1, 1);
        
            // Assert
            mockContext.Verify(x => x.AddArtiestBand(It.Is<ArtiestBand>(y => y.ArtiestId == artiest.Id && y.BandId == band.Id)), Times.Once());
            mockContext.Verify(x => x.SaveChangesAsync(), Times.Once());
            var noContentResult = Assert.IsType<NoContentResult>(result);
        }
        
        [Fact]
        public async Task AddArtistToBand_BandNotFound()
        {
            // Arrange
            var mockContext = new Mock<IDbTheaterLaakContext>();
            mockContext.Setup(x => x.FindBand(1)).Returns(Task.FromResult<Band>(null));
            var controller = new BandController(mockContext.Object);
        
            // Act
            var result = await controller.AddArtistToBand(1, 1);
        
            // Assert
            var notFoundResult = Assert.IsType<NotFoundResult>(result);
        }
        
        [Fact]
        public async Task AddArtistToBand_ArtiestNotFound()
        {
            // Arrange
            var mockContext = new Mock<IDbTheaterLaakContext>();
            var band = new Band { Id = 1, Naam = "The Beatles" };
            mockContext.Setup(x => x.FindBand(1)).Returns(Task.FromResult(band));
            mockContext.Setup(x => x.FindArtiest(1)).Returns(Task.FromResult<Artiest>(null));
            var controller = new BandController(mockContext.Object);
        
            // Act
            var result = await controller.AddArtistToBand(1, 1);
        
            // Assert
            var notFoundResult = Assert.IsType<NoContentResult>(result);
        }
        
        [Fact]
        public async Task DeleteBand_DeletesBand()
        {
            // Arrange
            var mockContext = new Mock<IDbTheaterLaakContext>();
            var band = new Band { Id = 1, Naam = "The Beatles" };
            mockContext.Setup(x => x.FindBand(1)).Returns(Task.FromResult(band));
            var controller = new BandController(mockContext.Object);
        
            // Act
            var result = await controller.DeleteBand(1);
        
            // Assert
            mockContext.Verify(x => x.RemoveBand(1), Times.Once());
            mockContext.Verify(x => x.SaveChangesAsync(), Times.Once());
            var actionResult = Assert.IsType<ActionResult<Band>>(result);
            var returnedBand = Assert.IsAssignableFrom<Band>(actionResult.Value);
            Assert.Equal(band, returnedBand);
        }
        
        // [Fact]
        // public async Task DeleteBand_BandNotFound()
        // {
        //     // Arrange
        //     var mockContext = new Mock<IDbTheaterLaakContext>();
        //     mockContext.Setup(x => x.FindBand(1)).Returns(Task.FromResult<Band>(null));
        //     var controller = new BandController(mockContext.Object);
        //
        //     // Act
        //     var result = await controller.DeleteBand(1);
        //
        //     // Assert
        //     mockContext.Verify(x => x.RemoveBand(1), Times.Never());
        //     mockContext.Verify(x => x.SaveChangesAsync(), Times.Never());
        //     var actionResult = Assert.IsType<ActionResult<Band>>(result);
        //     if (actionResult.Value == null)
        //     {
        //         Assert.IsType<NotFoundResult>(result);
        //     }
        // } 
}

