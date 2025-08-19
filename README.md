# TaskManager - Sistema de Gestión de Tareas

<p>Este proyecto es una aplicación web full-stack basada en .NET 8 y Angular. Permite crear, actualizar, listar y eliminar tareas, utilizando una arquitectura Onion para separar responsabilidades de manera clara y mantenible.</p>

## Arquitectura: Onion Architecture + Clean Code

<p>El proyecto está estructurado en 4 capas:</p>

- **TaskManager.API**: Capa de presentación (controladores HTTP).
- **TaskManager.Application**: Lógica de negocio (servicios, DTOs).
- **TaskManager.Domain**: Entidades y contratos (interfaces, enums).
- **TaskManager.Infrastructure**: Acceso a datos (EF Core, repositorios).

Estructura visual:
```
├───TASKMANAGER.API
│   ├───TASKMANAGER.API
│   │   ├───Controllers
│   ├───TASKMANAGER.APPLICATION
│   │   ├───DTOs
│   │   ├───Interfaces
│   │   └───Services
│   ├───TASKMANAGER.DOMAIN
│   │   ├───Entities
│   │   ├───Interfaces
│   │   │   └───Repositories
│   └───TASKMANAGER.INFRASTRUCTURE
│       ├───Persistence
│       └───Repositories
└───TASKMANAGER_UI
```

## Requisitos

- .NET 8 SDK
- Visual Studio 2022 o superior
- EF Core
- Swagger (habilitado por defecto)

## Instrucciones de ejecución

1. Restaurar paquetes:
   ```
   dotnet restore
   ```
2.	Ejecutar la API:
3.	dotnet run --project TASKMANAGER.API
4.	Acceder a Swagger:
5.	https://localhost:[PORT]/swagger

## Entidad: TaskItem

```
public class TaskItem
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? DueDate { get; set; }
    public TaskStatus Status { get; set; }
}
```
## Enum: TaskStatus
- Pending
- InProgress
- Completed

### 5. 🧠 **Servicios**

## Servicio: ITaskService

<p>Define las operaciones de negocio:</p>
- `GetAllAsync()`
- `GetByIdAsync(Guid id)`
- `CreateAsync(TaskDto dto)`
- `UpdateAsync(TaskDto dto)`
- `DeleteAsync(Guid id)`

## Interfaz: ITaskRepository
<p>Maneja acceso a datos:</p>

- `GetAllAsync()`
- `GetByIdAsync(id)`
- `AddAsync(task)`
- `UpdateAsync(task)`
- `DeleteAsync(id)`

## TasksController

| Método | Ruta             | Descripción             |
|--------|------------------|--------------------------|
| GET    | /api/tasks       | Listar todas las tareas |
| GET    | /api/tasks/{id}  | Obtener una tarea por id|
| POST   | /api/tasks       | Crear nueva tarea       |
| PUT    | /api/tasks/{id}  | Actualizar tarea        |
| DELETE | /api/tasks/{id}  | Eliminar tarea          |

# FRONTEND
## Requisitos

- Node.js 20+
- Angular CLI

## Comandos

```
npm install
npm start
```

### Estructura
- task.service.ts: Maneja peticiones HTTP.
- task-list.component.ts: Lista de tareas.
- task-form.component.ts: Crear/editar tareas.



