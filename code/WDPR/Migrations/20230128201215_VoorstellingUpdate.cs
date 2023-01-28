using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WDPR.Migrations
{
    /// <inheritdoc />
    public partial class VoorstellingUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BandId",
                table: "Voorstelling",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Voorstelling_BandId",
                table: "Voorstelling",
                column: "BandId");

            migrationBuilder.AddForeignKey(
                name: "FK_Voorstelling_Band_BandId",
                table: "Voorstelling",
                column: "BandId",
                principalTable: "Band",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Voorstelling_Band_BandId",
                table: "Voorstelling");

            migrationBuilder.DropIndex(
                name: "IX_Voorstelling_BandId",
                table: "Voorstelling");

            migrationBuilder.DropColumn(
                name: "BandId",
                table: "Voorstelling");
        }
    }
}
