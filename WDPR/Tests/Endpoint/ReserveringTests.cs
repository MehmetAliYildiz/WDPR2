using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using WDPR.Data;
using WDPR.Models;
using WDPR.Controllers;

namespace WDPR.Tests.Endpoint
{
    public class ReserveringTests
    {
        [Fact]
        public void GetAll_SimpleQuery_ReturnOK()
        {
            // Arrange
            List<Reservering> list = new List<Reservering>()
            {
                new Reservering(0)
                {
                    StartTijd = DateTime.Parse("2023/01/01 01:23:00"),
                    EindTijd  = DateTime.Parse("2023/01/01 02:23:00")
                }
            };
            var mockContext = new Mock<IDbTheaterLaakContext>();
            mockContext.Setup(x => x.GetReserveringen()).Returns(list);
            var controller = new ReserveringController(mockContext.Object);

            // Act
            var result = controller.GetAll("2023-01-01");

            // Assert
            Assert.IsType<OkObjectResult>(result);
            Assert.Equal("test data", (result as OkObjectResult).Value);
        }
    }
}
