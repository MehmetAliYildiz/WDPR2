using Microsoft.AspNetCore.Mvc;
using Moq;
using WDPR.Controllers;
using WDPR.Data;
using WDPR.Models;

namespace WDPRTest
{
    public class UnitTest1
    {
        public ReserveringController CreateControllerWithMock(List<Reservering> list)
        {
            var mockContext = new Mock<IDbTheaterLaakContext>();
            mockContext.Setup(x => x.GetReserveringen()).Returns(list);
            return new ReserveringController(mockContext.Object);
        }
        [Fact]
        public void GetAll_SimpleQuery_ReturnOK()
        {
            // Arrange
            string date = "2023/01/01";
            var st = DateTime.Parse(date + " " + "01:23:00");
            var et = DateTime.Parse(date + " " + "02:23:00");
            List<Reservering> list = new List<Reservering>()
            {
                new Reservering(0)
                {
                    StartTijd = st,
                    EindTijd  = et
                }
            };

            var controller = CreateControllerWithMock(list);

            // Act
            var result = controller.GetAll(date.Replace('/', '-'));
            var output = ((OkObjectResult)result).Value;

            // Assert
            Assert.IsType<OkObjectResult>(result);
            Assert.True(((IEnumerable<Reservering>)output).Where(r => r.StartTijd.Equals(st)).Any());
        }

        [Fact]
        public void GetAll_InvalidDate_ReturnBadRequest()
        {
            // Arrange
            string date = "ditIsDuidelijkNietEenDate";
            var controller = CreateControllerWithMock(new List<Reservering>());

            // Act
            var result = controller.GetAll(date);
            var output = ((ObjectResult)result).Value;

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}