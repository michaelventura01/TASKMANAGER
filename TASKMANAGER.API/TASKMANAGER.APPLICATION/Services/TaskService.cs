using TASKMANAGER.APPLICATION.DTOs;
using TASKMANAGER.APPLICATION.Interfaces;
using TASKMANAGER.DOMAIN.Entities;
using TASKMANAGER.DOMAIN.Interfaces.Repositories;

namespace TASKMANAGER.APPLICATION.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        // Inject the repository instead of ITaskService
        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }


        public async Task<IEnumerable<TaskItem>> GetAllTasks()
        {
            var tasks = await _taskRepository.GetAllAsync();
            return tasks.Select(task => new TaskItem
            {
                Id = (Guid)task.Id,
                Title = task.Title,
                Description = task.Description,
                CreatedAt = task.CreatedAt,
                DueDate = task.DueDate,
                Status = task.Status
            });
        }

        public async Task<TaskItem> GetByIdAsync(Guid id)
        {
            var task = await _taskRepository.GetByIdAsync(id);
            return task;
        }

        public async Task<TaskItem> CreateAsync(TaskItem dto)
        {
            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow,
                DueDate = dto.DueDate,
                Status = (DOMAIN.Entities.TaskStatus)dto.Status
            };
            await _taskRepository.AddAsync(task);
            return task;
        }

        public async Task<TaskItem> UpdateAsync(TaskItem dto)
        {
            var task = await _taskRepository.GetByIdAsync((Guid)dto.Id);
            task.Title = dto.Title;
            task.Description = dto.Description;
            task.Status = dto.Status;
            await _taskRepository.UpdateAsync(task);
            return task;
        }

        public async Task DeleteAsync(Guid id) => await _taskRepository.DeleteAsync(id);

    }
}
