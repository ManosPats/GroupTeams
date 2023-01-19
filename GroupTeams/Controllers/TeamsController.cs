using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GroupTeams.Data;
using GroupTeams.Models;
using System.Diagnostics;

namespace GroupTeams.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TeamsController(ApplicationDbContext context)
        {
            _context = context;
            _context.Database.EnsureCreated();
        }

        // GET: api/Teams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetTeam()
        {
            return await _context.Set<Team>().ToListAsync();
            //return await _context.Teams.ToListAsync();
        }

        // GET: api/Teams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> GetTeam(int id)
        {
            var team = await _context.Set<Team>().FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            return team;
        }

        // PUT: api/Teams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeam(int id, Team team)
        {
            if (id != team.Id)
            {
                return BadRequest();
            }

            _context.Entry(team).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Teams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Team>> PostTeam(Team team)
        {

            // Step 0. If team.Members == null run _context.Set<Team>().Add(team);
            // else Do Steps 1 - 3
            // Step 1. Save the team with empty Members collection
            // Step 2. Get the Id of the newly created team
            // Step 3. Run a foreach for all the members using this team Id

            // service Business Logic
            Debug.Print("Got to the controller");
            if (ModelState.IsValid)
            {
                if (team.Members == null)
                {
                    _context.Set<Team>().Add(team);
                }
                else
                {
                    // adds the new team
                    var entityTeam = _context.Set<Team>().Add(new Team()
                    {
                        Name = team.Name,
                        Description = team.Description
                    });
                    await _context.SaveChangesAsync(); // saves the team to db
                                                       // assign to the members the newly created team
                    var dbTeam = entityTeam.Entity;
                    // please make the next line to update the team.Members 
                    team.Members.Select(member => member.Team = dbTeam);
                    _context.Set<Member>().AddRange(team.Members);
                }
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetTeam", new { id = team.Id }, team);
            }
            return Problem("Members problem", null, 405);
            

            
        }

        // DELETE: api/Teams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var team = await _context.Set<Team>().FindAsync(id);
            if (team == null)
            {
                return NotFound();
            }

            _context.Set<Team>().Remove(team);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TeamExists(int id)
        {
            return _context.Set<Team>().Any(e => e.Id == id);
        }
    }
}
