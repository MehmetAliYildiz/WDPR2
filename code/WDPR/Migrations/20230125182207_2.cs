using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WDPR.Migrations
{
    public partial class _2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtiestBand_Gebruiker_ArtiestId",
                table: "ArtiestBand");

            migrationBuilder.DropForeignKey(
                name: "FK_Bestellingen_Gebruiker_GebruikerId",
                table: "Bestellingen");

            migrationBuilder.DropTable(
                name: "Gebruiker");

            migrationBuilder.DropTable(
                name: "ImageModel");

            migrationBuilder.RenameColumn(
                name: "IP",
                table: "Bestellingen",
                newName: "BezoekerId");

            migrationBuilder.AlterColumn<string>(
                name: "GebruikerId",
                table: "Bestellingen",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "ArtiestId",
                table: "ArtiestBand",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    recensie = table.Column<string>(type: "TEXT", nullable: false),
                    gebruikerId = table.Column<string>(type: "TEXT", nullable: false),
                    voorstellingId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => x.id);
                    table.ForeignKey(
                        name: "FK_Review_AspNetUsers_gebruikerId",
                        column: x => x.gebruikerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Review_Voorstelling_voorstellingId",
                        column: x => x.voorstellingId,
                        principalTable: "Voorstelling",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Review_gebruikerId",
                table: "Review",
                column: "gebruikerId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_voorstellingId",
                table: "Review",
                column: "voorstellingId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtiestBand_AspNetUsers_ArtiestId",
                table: "ArtiestBand",
                column: "ArtiestId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Bestellingen_AspNetUsers_GebruikerId",
                table: "Bestellingen",
                column: "GebruikerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtiestBand_AspNetUsers_ArtiestId",
                table: "ArtiestBand");

            migrationBuilder.DropForeignKey(
                name: "FK_Bestellingen_AspNetUsers_GebruikerId",
                table: "Bestellingen");

            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "BezoekerId",
                table: "Bestellingen",
                newName: "IP");

            migrationBuilder.AlterColumn<int>(
                name: "GebruikerId",
                table: "Bestellingen",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ArtiestId",
                table: "ArtiestBand",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.CreateTable(
                name: "Gebruiker",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Naam = table.Column<string>(type: "TEXT", nullable: false),
                    Wachtwoord = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gebruiker", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ImageModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ContentType = table.Column<string>(type: "TEXT", nullable: false),
                    Data = table.Column<byte[]>(type: "BLOB", nullable: false),
                    FileName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageModel", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ArtiestBand_Gebruiker_ArtiestId",
                table: "ArtiestBand",
                column: "ArtiestId",
                principalTable: "Gebruiker",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Bestellingen_Gebruiker_GebruikerId",
                table: "Bestellingen",
                column: "GebruikerId",
                principalTable: "Gebruiker",
                principalColumn: "Id");
        }
    }
}
