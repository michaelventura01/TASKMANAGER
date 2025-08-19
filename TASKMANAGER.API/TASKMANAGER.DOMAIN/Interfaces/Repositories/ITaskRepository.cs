using TASKMANAGER.DOMAIN.Entities;

namespace TASKMANAGER.DOMAIN.Interfaces.Repositories
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskItem>> GetAllAsync();
        Task<TaskItem?> GetByIdAsync(Guid id);
        Task AddAsync(TaskItem item);
        Task UpdateAsync(TaskItem item);
        Task DeleteAsync(Guid id);
    }
}
