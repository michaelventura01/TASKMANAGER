using TASKMANAGER.DOMAIN.Entities;

namespace TASKMANAGER.APPLICATION.DTOs
{
    public class TaskDto
    {
        public TaskDto() { }
        public TaskDto(TaskItem? taskItem)
        {
            TaskItem = taskItem;
        }

        public Guid Id { set; get; }
        public string Title { set; get; }
        public string? Description { set; get; }
        public DateTime CreatedAt { set; get; }
        public DateTime? DueDate { set; get; }
        public DOMAIN.Entities.TaskStatus Status { set; get; }
        public DOMAIN.Entities.TaskItem? TaskItem { set; get; }
    }
}
