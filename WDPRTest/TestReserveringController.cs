using Microsoft.AspNetCore.Mvc;
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
                    VrijeRuimteId = 0,
                    StartTijd = st,
                    EindTijd  = et
                }
            };

            var controller = CreateControllerWithMock(list);

            // Act
            var result = controller.GetAll(0, date.Replace('/', '-'));
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
            var result = controller.GetAll(0, date);
            var output = ((ObjectResult)result).Value;

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void Post_Overlapping_ReturnBadRequest()
        {
            // Arrange
            var st1 = DateTime.Parse("2023/01/01 01:00:00");
            var st2 = DateTime.Parse("2023/01/01 01:15:00").AddHours(-1); // Counteract controller addhours
            var et1 = DateTime.Parse("2023/01/01 01:30:00");
            var et2 = DateTime.Parse("2023/01/01 01:45:00").AddHours(-1); // Counteract controller addhours
            List<Reservering> reserveringen = new List<Reservering>()
            {
                new Reservering(0)
                {
                    VrijeRuimteId = 0,
                    StartTijd = st1,
                    EindTijd = et1
                }
            };
            var controller = CreateControllerWithMock(reserveringen);

            var nieuweReservering = new Reservering(1)
            {
                VrijeRuimteId = 0,
                StartTijd = st2,
                EindTijd = et2
            };

            // Act
            var result = controller.Post(nieuweReservering);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void Post_BadTime_ReturnBadRequest()
        {
            // Arrange
            var st = DateTime.Parse("2023/01/01 02:00:00");
            var et = DateTime.Parse("2023/01/01 01:00:00");
            var controller = CreateControllerWithMock(new List<Reservering>());

            var nieuweReservering = new Reservering(1)
            {
                StartTijd = st,
                EindTijd = et
            };

            // Act
            var result = controller.Post(nieuweReservering);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}