using Microsoft.AspNetCore.Mvc;
using TASKMANAGER.APPLICATION.Interfaces;
using TASKMANAGER.DOMAIN.Entities;

namespace TASKMANAGER.API.Controllers
{
    [Route("[controller]")]
    public class TasksController : Controller
    {
        private readonly ITaskService _service;
        public TasksController(ITaskService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _service.GetAllTasks());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id) => Ok(await _service.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskItem dto)
        {
            if (dto is null)
            {
                return BadRequest("Task data is required.");
            }

            var created = await _service.CreateAsync(dto);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] TaskItem dto){
            if (dto is null)
            {
                return BadRequest("Task data is required.");
            }

            var updated = await _service.UpdateAsync(dto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id) { await _service.DeleteAsync(id); return NoContent(); }

    }
}
