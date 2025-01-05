using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduBrain.Migrations
{
    /// <inheritdoc />
    public partial class lasttryagainv1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId",
                table: "ClubReps");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId",
                table: "ClubReps",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId",
                table: "ClubReps");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId",
                table: "ClubReps",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
