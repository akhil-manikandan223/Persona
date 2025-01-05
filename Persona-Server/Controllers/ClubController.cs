using EduBrain.Data;
using EduBrain.Models.Clubs;
using Microsoft.AspNetCore.Mvc;

namespace EduBrain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClubController : ControllerBase
    {
        private readonly EduBrainContext _context;

        public ClubController(EduBrainContext context)
        {
            _context = context;
        }

        // GET: api/club/getallclubs
        [HttpGet("getallclubs")]
        public IActionResult ShowAllClubs()
        {
            var clubs = _context.Clubs.ToList();
            return Ok(clubs);
        }

        // GET: api/club/getclubbyid/{id}
        [HttpGet("getclubbyid/{id}")]
        public IActionResult GetClubById(int id)
        {
            try
            {
                var club = _context.Clubs.FirstOrDefault(c => c.ClubId == id);

                if (club == null)
                {
                    return NotFound($"Club with ID {id} is not found.");
                }
                return Ok(club);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/club/addclubs
        [HttpPost("addclubs")]
        public IActionResult AddClub([FromBody] Club clubDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Clubs.Add(clubDetails);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetClubById), new { id = clubDetails.ClubId }, clubDetails);
        }

        // PUT: api/club/updateclub/{id}
        [HttpPut("updateclub/{id}")]
        public IActionResult UpdateClub(int id, [FromBody] Club clubDetails)
        {
            var clubToUpdate = _context.Clubs.FirstOrDefault(c => c.ClubId == id);

            if (clubToUpdate == null)
            {
                return NotFound($"Club with ID {id} is not found.");
            }
            clubToUpdate.ClubName = clubDetails.ClubName;
            _context.Clubs.Update(clubToUpdate);
            _context.SaveChanges();
            return Ok(clubToUpdate);
        }

        // DELETE: api/club/deleteclub/{id}
        [HttpDelete("deleteclub/{id}")]
        public IActionResult RemoveClub(int id)
        {
            var clubToDelete = _context.Clubs.FirstOrDefault(c => c.ClubId == id);

            if (clubToDelete == null)
            {
                return NotFound($"Club with ID {id} is not found.");
            }

            _context.Clubs.Remove(clubToDelete);
            _context.SaveChanges();
            return NoContent();
        }

        // GET: api/club/gettotalclubmembers
        [HttpGet("gettotalclubmembers")]
        public IActionResult GetTotalClubMembers()
        {
            var clubMembers = _context.Students
                .Where(s => s.ClubId != null)
                .GroupBy(s => s.ClubId)
                .Select(group => new
                {
                    ClubId = group.Key,
                    TotalMembers = group.Count()
                })
                .ToList();

            var employeeClubMembers = _context.Employees
                .Where(e => e.ClubId != null)
                .GroupBy(e => e.ClubId)
                .Select(group => new
                {
                    ClubId = group.Key,
                    TotalMembers = group.Count()
                })
                .ToList();

            // Combine student and employee club members by club ID
            var totalMembersByClub = clubMembers
                .Concat(employeeClubMembers)
                .GroupBy(c => c.ClubId)
                .Select(group => new
                {
                    ClubId = group.Key,
                    TotalMembers = group.Sum(m => m.TotalMembers)
                })
                .ToList();

            return Ok(totalMembersByClub);
        }


        // GET: api/club/gettotalclubmembersbyclubid
        [HttpGet("gettotalclubmembers/{clubId}")]
        public IActionResult GetTotalClubMembers(int clubId)
        {
            var studentClubMembers = _context.Students
                .Where(s => s.ClubId == clubId)
                .Count();

            var employeeClubMembers = _context.Employees
                .Where(e => e.ClubId == clubId)
                .Count();

            var totalMembers = studentClubMembers + employeeClubMembers;

            return Ok(new { ClubId = clubId, TotalMembers = totalMembers });
        }


        // GET: api/club/gettotalstudentmembers
        [HttpGet("gettotalstudentmembers/{clubId}")]
        public IActionResult GetTotalStudentMembers(int clubId)
        {
            var totalStudentMembers = _context.Students
                .Where(s => s.ClubId == clubId)
                .Count();

            return Ok(new { ClubId = clubId, TotalStudentMembers = totalStudentMembers });
        }

        // GET: api/club/gettotalemployeemembers
        [HttpGet("gettotalemployeemembers/{clubId}")]
        public IActionResult GetTotalEmployeeMembers(int clubId)
        {
            var totalEmployeeMembers = _context.Employees
                .Where(e => e.ClubId == clubId)
                .Count();

            return Ok(new { ClubId = clubId, TotalEmployeeMembers = totalEmployeeMembers });
        }

        // GET: api/club/getstudentmembersbyclubid/{clubId}
        [HttpGet("getstudentmembersbyclubid/{clubId}")]
        public IActionResult GetStudentMembersByClubId(int clubId)
        {
            var studentMembers = _context.Students
                .Where(s => s.ClubId == clubId)
                .Select(s => new
                {
                    s.StudentId,
                    s.StudentName,
                    s.Gender,
                    s.Mobile,
                    s.ClassName,
                    s.ClubId
                })
                .ToList();

            return Ok(new { ClubId = clubId, StudentMembers = studentMembers });
        }

        // GET: api/club/getemployeemembersbyclubid/{clubId}
        [HttpGet("getemployeemembersbyclubid/{clubId}")]
        public IActionResult GetEmployeeMembersByClubId(int clubId)
        {
            var employeeMembers = _context.Employees
                .Where(e => e.ClubId == clubId)
                .Select(e => new
                {
                    e.EmployeeCode,   
                    e.EmployeeName,
                    e.Gender,
                    e.Mobile,
                    e.DepartmentId,
                    e.ClubId
                })
                .ToList();

            return Ok(new { ClubId = clubId, EmployeeMembers = employeeMembers });
        }

    }
}

