using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduBrain.Migrations
{
    /// <inheritdoc />
    public partial class addedtotalmemberstoclubtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Teachers_EmployeeId",
                table: "ClubReps");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId",
                table: "ClubReps",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId",
                table: "ClubReps");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Teachers_EmployeeId",
                table: "ClubReps",
                column: "EmployeeId",
                principalTable: "Teachers",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
