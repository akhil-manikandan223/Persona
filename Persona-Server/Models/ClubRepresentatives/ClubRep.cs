using EduBrain.Models.Clubs;
using EduBrain.Models.Employees;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduBrain.Models.ClubRepresentatives
{
    public class ClubRep
    {
        [Key]
        public int Id { get; set; }  // Primary key

        // Foreign key relationships with the Club, Student, and Employee models
        public int? ClubId { get; set; }  // Foreign key property
        public virtual Club Club { get; set; }  // Navigation property for the Club entity

        public int? StudentId { get; set; }  // Foreign key property
        public virtual Student Student { get; set; }  // Navigation property for the Student entity

        public int? EmployeeId { get; set; }  // Foreign key property
        public virtual Employee Employee { get; set; }  // Navigation property for the Employee entity
    }

}
