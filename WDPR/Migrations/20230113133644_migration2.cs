using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WDPR.Migrations
{
    public partial class migration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stoel_Zaal_Id",
                table: "Stoel");

            migrationBuilder.AlterColumn<int>(
                name: "Rang",
                table: "Stoel",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Stoel",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "ZaalId",
                table: "Stoel",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stoel_ZaalId",
                table: "Stoel",
                column: "ZaalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stoel_Zaal_ZaalId",
                table: "Stoel",
                column: "ZaalId",
                principalTable: "Zaal",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stoel_Zaal_ZaalId",
                table: "Stoel");

            migrationBuilder.DropIndex(
                name: "IX_Stoel_ZaalId",
                table: "Stoel");

            migrationBuilder.DropColumn(
                name: "ZaalId",
                table: "Stoel");

            migrationBuilder.AlterColumn<string>(
                name: "Rang",
                table: "Stoel",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Stoel",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddForeignKey(
                name: "FK_Stoel_Zaal_Id",
                table: "Stoel",
                column: "Id",
                principalTable: "Zaal",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
