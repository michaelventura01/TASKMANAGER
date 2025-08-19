using TASKMANAGER.APPLICATION.DTOs;
using TASKMANAGER.DOMAIN.Entities;

namespace TASKMANAGER.APPLICATION.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllTasks();
        Task<TaskItem> GetByIdAsync(Guid id);
        Task<TaskItem> CreateAsync(TaskItem dto);
        Task<TaskItem> UpdateAsync(TaskItem dto);
        Task DeleteAsync(Guid id);
    }
}
