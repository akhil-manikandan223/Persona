﻿using EduBrain.Models.Clubs;
using EduBrain.Models.Departments;
using EduBrain.Models.EmployeeCategories;
using EduBrain.Models.Locations;
using EduBrain.Models.States;
using EduBrain.Models.Subjects;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using EduBrain.Models.ClubRepresentatives;

namespace EduBrain.Models.Employees
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        [NotMapped]
        public string EmployeeCode => $"Ed-{EmployeeId}";
        public string EmployeeName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Gender { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }


        public DateTime DateOfBirth { get; set; }

        // Foreign key properties
        public int CategoryId { get; set; }
        public int DepartmentId { get; set; }
        public int SubjectId { get; set; }
        public int ClubId { get; set; }
        public int LocationId { get; set; }
        public int StateId { get; set; }



        // Navigation properties
        public virtual EmployeeCategory Category { get; set; }
        public virtual Department Department { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual Club Club { get; set; }
        public virtual Location Location { get; set; }
        public virtual State State { get; set; }

        public virtual ICollection<ClubRep> ClubReps { get; set; }
    }
}
