using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using WDPR.Controllers;
using WDPR.Data;
using WDPR.Models;


namespace WDPRTest;

public class ArtiestControllerTests
{
    private readonly ArtiestController _controller;
    private readonly Mock<IDbTheaterLaakContext> _context;
    private readonly Artiest _testArtiest;

    public ArtiestControllerTests()
    {
        _context = new Mock<IDbTheaterLaakContext>();
        _controller = new ArtiestController(_context.Object);
        _testArtiest = new Artiest
        {
            Id = 1,
            Naam = "John Doe",
            Wachtwoord = "password",
            Email = "johndoe@example.com",
            ArtiestBands = new List<ArtiestBand>()
        };

    }
    
    List<Artiest> _testArtiestenList = new List<Artiest>()
    {
        new Artiest { Id = 1, Naam = "Artiest1", Wachtwoord = "password1", Email = "artiest1@email.com" },
        new Artiest { Id = 2, Naam = "Artiest2", Wachtwoord = "password2", Email = "artiest2@email.com" },
        new Artiest { Id = 3, Naam = "Artiest3", Wachtwoord = "password3", Email = "artiest3@email.com" }
    };
    

    [Fact]
    public void GetArtiesten_ReturnsAllArtiesten()
    {
        //Arrange
        _context.Setup(x => x.GetArtiesten()).Returns(_testArtiestenList);
        //Act
        var result = _controller.GetArtiesten();
        //Assert
        Assert.NotNull(result);
        Assert.Equal(_testArtiestenList, result.Value);
    }


    [Fact]
    public async void GetArtiest_ReturnsArtiestWithMatchingId()
    {
        // Arrange
        _context.Setup(x => x.FindArtiest(1)).ReturnsAsync(_testArtiest);
    
        // Act
        var result = await _controller.GetArtiest(1);
    
        // Assert
        Assert.NotNull(result);
        Assert.IsType<Artiest>(result.Value);
        Assert.Equal(result.Value, _testArtiest);
        Assert.Equal(result.Value.Id, _testArtiest.Id);
    }

    [Fact]
    public async void GetArtiest_ReturnsNotFound_WhenIdNotFound()
    {
        // Arrange
        _context.Setup(x => x.FindArtiest(5)).ReturnsAsync((Artiest)null);
    
        // Act
        var result = await _controller.GetArtiest(2);
    
        // Assert
        Assert.Null(result.Value);
    }
    
    [Fact]
    public async void PostArtiest_AddsArtiestAndReturnsCreatedAtAction()
    {
        // Arrange
        var artiestDTO = new ArtiestDTO
        {
            Id = 1,
            Naam = "John Doe",
            Wachtwoord = "password",
            Email = "johndoe@example.com"
        };
        _context.Setup(x => x.SaveChangesAsync()).ReturnsAsync(1);

        // Act
        var result = await _controller.PostArtiest(artiestDTO);

        // Assert
        _context.Verify(x => x.AddArtiest(It.IsAny<Artiest>()), Times.Once);
        _context.Verify(x => x.SaveChangesAsync(), Times.Once);
        var createdAtAction = Assert.IsType<CreatedAtActionResult>(result);
        var artiest = Assert.IsType<Artiest>(createdAtAction.Value);
        Assert.Equal(1, artiest.Id);
        Assert.Equal("John Doe", artiest.Naam);
        Assert.Equal("password", artiest.Wachtwoord);
        Assert.Equal("johndoe@example.com", artiest.Email);

    }
    
    [Fact]
    public async void DeleteArtiest_RemovesArtiestAndReturnsIt()
    {
        // Arrange
        _context.Setup(x => x.FindArtiest(1)).ReturnsAsync(_testArtiest);
        _context.Setup(x => x.SaveChangesAsync()).ReturnsAsync(1);

        // Act
        var result = await _controller.DeleteArtiest(1);

        // Assert
        _context.Verify(x => x.RemoveArtiest(1), Times.Once);
        _context.Verify(x => x.SaveChangesAsync(), Times.Once);
        var artiest = Assert.IsType<Artiest>(result.Value);
        Assert.Equal(1, artiest.Id);
        Assert.Equal("John Doe", artiest.Naam);
        Assert.Equal("password", artiest.Wachtwoord);
        Assert.Equal("johndoe@example.com", artiest.Email);
    }

    // [Fact]
    // public async void DeleteArtiest_ReturnsNotFound_WhenIdNotFound()
    // {
    //     // Arrange
    //     _context.Setup(x => x.FindArtiest(1)).ReturnsAsync((Artiest)null);
    //
    //     // Act
    //     var result = await _controller.DeleteArtiest(1);
    //
    //     // Assert
    //     Assert.IsType<NotFoundResult>(result);
    // }
}
