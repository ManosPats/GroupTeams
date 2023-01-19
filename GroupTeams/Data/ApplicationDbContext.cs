using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GroupTeams.Models;

namespace GroupTeams.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext (DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Team> Teams { get; set; } = default!;
        public virtual DbSet<Member> Members { get; set; } // optional
    }
}
