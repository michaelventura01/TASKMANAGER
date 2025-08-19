namespace TASKMANAGER.DOMAIN.Entities
{
    public enum TaskStatus { Pending, InProgress, Completed };
    public class TaskItem
    {
        public Guid? Id { set; get; }
        public string Title { set; get; }
        public string? Description { set; get; }
        public DateTime CreatedAt { set; get; }
        public DateTime? DueDate { set; get; }
        public TaskStatus Status { set; get; } = TaskStatus.Pending;
    }
}
