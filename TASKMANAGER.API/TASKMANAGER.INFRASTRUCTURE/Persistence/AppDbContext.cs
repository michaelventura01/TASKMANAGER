using Microsoft.EntityFrameworkCore;
using TASKMANAGER.DOMAIN.Entities;

namespace TASKMANAGER.INFRASTRUCTURE.Persistence
{
    public class AppDbContext: DbContext
    {
        public DbSet<TaskItem> Tasks=>Set<TaskItem>();

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
