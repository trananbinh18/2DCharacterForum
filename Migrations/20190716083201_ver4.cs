using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactAppWeek3.Migrations
{
    public partial class ver4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Characters",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CharacterId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_CharacterId",
                table: "AspNetUsers",
                column: "CharacterId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Characters_CharacterId",
                table: "AspNetUsers",
                column: "CharacterId",
                principalTable: "Characters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Characters_CharacterId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_CharacterId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "CharacterId",
                table: "AspNetUsers");
        }
    }
}
