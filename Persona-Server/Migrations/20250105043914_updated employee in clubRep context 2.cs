using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduBrain.Migrations
{
    /// <inheritdoc />
    public partial class updatedemployeeinclubRepcontext2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Clubs_ClubId",
                table: "ClubReps");

            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId",
                table: "ClubReps");

            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Clubs_ClubId",
                table: "Employees");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Clubs_ClubId",
                table: "ClubReps",
                column: "ClubId",
                principalTable: "Clubs",
                principalColumn: "ClubId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId",
                table: "ClubReps",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Clubs_ClubId",
                table: "Employees",
                column: "ClubId",
                principalTable: "Clubs",
                principalColumn: "ClubId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Clubs_ClubId",
                table: "ClubReps");

            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId",
                table: "ClubReps");

            migrationBuilder.DropForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Clubs_ClubId",
                table: "Employees");

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Clubs_ClubId",
                table: "ClubReps",
                column: "ClubId",
                principalTable: "Clubs",
                principalColumn: "ClubId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Employees_EmployeeId",
                table: "ClubReps",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClubReps_Students_StudentId",
                table: "ClubReps",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Clubs_ClubId",
                table: "Employees",
                column: "ClubId",
                principalTable: "Clubs",
                principalColumn: "ClubId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
