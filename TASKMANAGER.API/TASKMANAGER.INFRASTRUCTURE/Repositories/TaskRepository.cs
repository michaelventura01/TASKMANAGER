using Microsoft.EntityFrameworkCore;
using TASKMANAGER.DOMAIN.Entities;
using TASKMANAGER.DOMAIN.Interfaces.Repositories;
using TASKMANAGER.INFRASTRUCTURE.Persistence;

namespace TASKMANAGER.INFRASTRUCTURE.Repositories
{
    public class TaskRepository: ITaskRepository
    {
        private readonly AppDbContext _context;
        public TaskRepository(AppDbContext context){ 
            _context = context; 
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync(){ 
            return await _context.Tasks.ToListAsync(); 
        }
        public async Task<TaskItem?> GetByIdAsync(Guid id){
            return await _context.Tasks.FindAsync(id); 
        }

        public async Task AddAsync(TaskItem task) { 
            await _context.Tasks.AddAsync(task); 
            await _context.SaveChangesAsync(); 
        }
        public async Task UpdateAsync(TaskItem task) { 
            _context.Tasks.Update(task); 
            await _context.SaveChangesAsync(); 
        }
        public async Task DeleteAsync(Guid id) { 
            var task = await _context.Tasks.FindAsync(id); 
            _context.Tasks.Remove(task); 
            await _context.SaveChangesAsync(); 
        }

    }
}
