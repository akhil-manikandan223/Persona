using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduBrain.Migrations
{
    /// <inheritdoc />
    public partial class UpdateClubRepRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps");

            migrationBuilder.AddColumn<int>(
                name: "StudentId1",
                table: "ClubReps",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ClubReps_StudentId1",
                table: "ClubReps",
                column: "StudentId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Students_StudentId1",
                table: "ClubReps",
                column: "StudentId1",
                principalTable: "Students",
                principalColumn: "StudentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps");

            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Students_StudentId1",
                table: "ClubReps");

            migrationBuilder.DropIndex(
                name: "IX_ClubReps_StudentId1",
                table: "ClubReps");

            migrationBuilder.DropColumn(
                name: "StudentId1",
                table: "ClubReps");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
