using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduBrain.Migrations
{
    /// <inheritdoc />
    public partial class lasttry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps");

            migrationBuilder.AddColumn<int>(
                name: "ClubId1",
                table: "ClubReps",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId1",
                table: "ClubReps",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ClubReps_ClubId1",
                table: "ClubReps",
                column: "ClubId1");

            migrationBuilder.CreateIndex(
                name: "IX_ClubReps_EmployeeId1",
                table: "ClubReps",
                column: "EmployeeId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Clubs_ClubId1",
                table: "ClubReps",
                column: "ClubId1",
                principalTable: "Clubs",
                principalColumn: "ClubId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId1",
                table: "ClubReps",
                column: "EmployeeId1",
                principalTable: "Employees",
                principalColumn: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Clubs_ClubId1",
                table: "ClubReps");

            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId1",
                table: "ClubReps");

            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps");

            migrationBuilder.DropIndex(
                name: "IX_ClubReps_ClubId1",
                table: "ClubReps");

            migrationBuilder.DropIndex(
                name: "IX_ClubReps_EmployeeId1",
                table: "ClubReps");

            migrationBuilder.DropColumn(
                name: "ClubId1",
                table: "ClubReps");

            migrationBuilder.DropColumn(
                name: "EmployeeId1",
                table: "ClubReps");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
