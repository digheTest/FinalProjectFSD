using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using TaskManagerReference;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [RoutePrefix("api/[controller]")]
    public class ValuesController : ApiController
    {
        ModelFactory _modelFactory;

        public ValuesController()
        {
            _modelFactory = new ModelFactory();
        }
        public ValuesController(ModelFactory modelFactory)
        {
            _modelFactory = modelFactory;
        }
        [HttpGet]
        public IEnumerable<ParentTaskModel> Get()
        {
            TaskManagerRepository parentTaskRep = new TaskManagerRepository();

            var allParentTask = parentTaskRep.GetAllParentTasksRepo().ToList();

            var allChildTask = parentTaskRep.GetAllTaskRepo().ToList();

            Parent_Task_Tbl newParent = new Parent_Task_Tbl
            {
                Task_Tbl = allChildTask,
            };

            allParentTask.Add(newParent);

            return allParentTask.Select(p => _modelFactory.GetParentTaskMoDel(p));
        }

        [HttpGet]
        public TaskModel GetTask([FromUri]int taskID)
        {
            TaskManagerRepository tmRep = new TaskManagerRepository();
            Task_Tbl taskDb = tmRep.GetTaskRepo(taskID);
            return _modelFactory.getTaskModel(taskDb);
        }

        [HttpPost]
        public IHttpActionResult ManageParentTask([FromBody]ParentTaskModel parentTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                TaskManagerRepository parentTaskRep = new TaskManagerRepository();

                Parent_Task_Tbl parentTaskDb = parentTaskRep.getParent(parentTask.ParentTaskID);

                if (parentTaskDb != null)
                {
                    parentTaskDb.Parent_Task = parentTask.ParentTaskName;

                    string result = "{'ParentTaskID': " + parentTaskRep.EditParentTask(parentTaskDb) + "}";

                    JObject json = JObject.Parse(result);

                    return Ok<JObject>(json);
                }
                else
                {

                    Parent_Task_Tbl parentTaskNewDb = new Parent_Task_Tbl
                    {
                        Parent_Task = parentTask.ParentTaskName,
                    };

                    string result = "{'ParentTaskID': " + parentTaskRep.CreateParentTask(parentTaskNewDb) + "}";

                    JObject json = JObject.Parse(result);

                    return Ok<JObject>(json);
                }

            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred in CreateParentTask :" + ex.StackTrace);
            }

        }

        [HttpPost]
        public IHttpActionResult editParentTask([FromBody]ParentTaskModel parentTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                if (parentTask != null)//if 0 for no chnage in parent task
                {
                    TaskManagerRepository tmRep = new TaskManagerRepository();

                    Parent_Task_Tbl parentTaskDb = new Parent_Task_Tbl
                    {
                        Parent_ID = parentTask.ParentTaskID,
                        Parent_Task = parentTask.ParentTaskName,
                    };

                    string result = "{'ParentTaskID': " + tmRep.EditParentTask(parentTaskDb) + "}";

                    JObject json = JObject.Parse(result);

                    return Ok<JObject>(json);
                }
                else
                {
                    return BadRequest("Error occurred in editProject");
                }

            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred in EditParentTask :" + ex.StackTrace);
            }

        }


        [HttpPost]
        public IHttpActionResult ManageTask([FromBody]ParentTaskModel parentTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                if (parentTask.ParentTaskID == 0)//if 0 for no chnage in parent task
                {
                    return TaskDBChanges(parentTask.Task.FirstOrDefault(), 0);
                }
                else if (parentTask.ParentTaskID == -1)// if -1 to create new parenk task
                {
                    return ManageParentTask(parentTask);
                }
                else // else update parent task details
                {
                    return TaskDBChanges(parentTask.Task.FirstOrDefault(), parentTask.ParentTaskID);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred in CreateTask :" + ex.StackTrace);
            }

        }

        [HttpPost]
        public IHttpActionResult addUser([FromBody]UsersModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                if (user != null)//if 0 for no chnage in parent task
                {
                    TaskManagerRepository tmRep = new TaskManagerRepository();

                    User_Tbl userDb = new User_Tbl
                    {
                        First_Name = user.FirstName,
                        Last_Name = user.LastName,
                        Employee_ID = user.EmpID,
                    };

                    string result = "{'UserID': " + tmRep.addUser(userDb) + "}";

                    JObject json = JObject.Parse(result);

                    return Ok<JObject>(json);
                }
                else
                {
                    return BadRequest("Error occurred in AddUser");
                }

            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred in AddUser :" + ex.StackTrace);
            }

        }

        [HttpPost]
        public IHttpActionResult editUser([FromBody]UsersModel user)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            try
            {
                TaskManagerRepository tmRep = new TaskManagerRepository();

                User_Tbl userDb = tmRep.getUser(user.UserId);

                if (userDb != null)
                {
                    userDb.First_Name = user.FirstName;
                    userDb.Last_Name = user.LastName;
                    userDb.Employee_ID = Convert.ToInt32(user.EmpID);
                    string result = "{'UserID': " + tmRep.editUser(userDb) + "}";
                    JObject json = JObject.Parse(result);
                    return Ok<JObject>(json);
                }
                else
                {
                    return BadRequest("Error occurred during data update in editUser");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred in editUser :" + ex.StackTrace);
            }
        }

        [HttpDelete]
        public IHttpActionResult deleteUser([FromUri]int userID)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            try
            {
                TaskManagerRepository tmRep = new TaskManagerRepository();

                if (userID > 0)
                {
                    tmRep.deleteUser(userID);
                    return Ok();
                }
                else
                {
                    return BadRequest("Error occurred during data deletion in deleteUser");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred in deleteUser :" + ex.StackTrace);
            }
        }

        [HttpGet]
        public IEnumerable<UsersModel> getAllUsers()
        {
            TaskManagerRepository tmRep = new TaskManagerRepository();
            return tmRep.getAllUsers().ToList().Select(u => _modelFactory.getUsersModel(u));
        }
        [HttpGet]
        public UsersModel getUser([FromUri]int userID)
        {
            TaskManagerRepository tmRep = new TaskManagerRepository();
            User_Tbl userDb = tmRep.getUser(userID);
            return _modelFactory.getUsersModel(userDb);
        }

        [HttpPost]
        public IHttpActionResult addProject([FromBody]ProjectModel project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                if (project != null)
                {
                    TaskManagerRepository tmRep = new TaskManagerRepository();

                    Project_Tbl projectDb = new Project_Tbl
                    {
                        Project = project.ProjectName,
                        Start_Date = project.StartDate != null ? Convert.ToDateTime(project.StartDate) : (DateTime?)null,
                        End_Date = project.EndDate != null ? Convert.ToDateTime(project.EndDate) : (DateTime?)null,
                        Priority = project.Priority,
                    };

                    int userId = project.Users != null ? project.Users.FirstOrDefault().UserId : 0;

                    string result = "{'ProjectID': " + tmRep.addProject(projectDb, userId) + "}";

                    JObject json = JObject.Parse(result);

                    return Ok<JObject>(json);
                }
                else
                {
                    return BadRequest("Error occurred in addProject");
                }

            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred in addProject :" + ex.StackTrace);
            }

        }

        [HttpPost]
        public IHttpActionResult editProject([FromBody]ProjectModel project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                if (project != null)//if 0 for no chnage in parent task
                {
                    TaskManagerRepository tmRep = new TaskManagerRepository();

                    Project_Tbl projectDb = new Project_Tbl
                    {
                        Project_ID = project.ProjectID,
                        Project = project.ProjectName,
                        Start_Date = project.StartDate != null ? Convert.ToDateTime(project.StartDate) : (DateTime?)null,
                        End_Date = project.EndDate != null ? Convert.ToDateTime(project.EndDate) : (DateTime?)null,
                        Priority = project.Priority,
                    };

                    int userId = project.Users != null ? project.Users.FirstOrDefault().UserId : 0;

                    string result = "{'ProjectID': " + tmRep.editProject(projectDb, userId) + "}";

                    JObject json = JObject.Parse(result);

                    return Ok<JObject>(json);
                }
                else
                {
                    return BadRequest("Error occurred in editProject");
                }

            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred in editProject :" + ex.StackTrace);
            }

        }
        [HttpGet]
        public IEnumerable<ProjectModel> getAllProjects()
        {
            TaskManagerRepository tmRep = new TaskManagerRepository();
            return tmRep.getAllProjects().ToList().Select(u => _modelFactory.getProjectModel(u));
        }

        [HttpGet]
        public ProjectModel getProject([FromUri]int projectID)
        {
            TaskManagerRepository tmRep = new TaskManagerRepository();
            Project_Tbl projectDb = tmRep.getProject(projectID);
            return _modelFactory.getProjectModel(projectDb);
        }

        [HttpDelete]
        public IHttpActionResult deleteProject([FromUri]int projectID)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            try
            {
                TaskManagerRepository tmRep = new TaskManagerRepository();

                if (projectID > 0)
                {
                    if (tmRep.getUserFromProjectID(projectID) != null)
                    {
                        return BadRequest("Could not delete Project having User mapped");
                    }
                    else
                    {
                        tmRep.deleteProject(projectID);
                        return Ok();
                    }
                }
                else
                {
                    return BadRequest("Error occurred during data deletion in deleteProject");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred in DeleteTask :" + ex.StackTrace);
            }
        }

        private IHttpActionResult TaskDBChanges(TaskModel taskModel, int parentID = 0)
        {
            TaskManagerRepository taskRep = new TaskManagerRepository();

            Task_Tbl taskDb = taskRep.GetTaskRepo(taskModel.TaskId);

            if (taskDb != null)
            {
                taskDb.Parent_ID = parentID > 0 ? parentID : (int?)null;
                taskDb.Task = taskModel.TaskName;
                taskDb.Start_Date = Convert.ToDateTime(taskModel.StartDate);
                taskDb.End_Date = Convert.ToDateTime(taskModel.EndDate);
                taskDb.Priority = taskModel.Priority;
                taskDb.Is_Completed = Convert.ToBoolean(taskModel.IsCompleted);
                taskDb.Project_ID = taskModel.Users != null ? taskModel.Users.FirstOrDefault().Project != null ?
                    taskModel.Users.FirstOrDefault().Project.FirstOrDefault().ProjectID > 0 ? taskModel.Users.FirstOrDefault().Project.FirstOrDefault().ProjectID
                    : (int?)null : (int?)null : (int?)null;

                string result = "{'TaskID': " + taskRep.EditTask(taskDb) + "}";

                JObject json = JObject.Parse(result);

                return Ok<JObject>(json);
            }
            else
            {
                int userID = taskModel.Users != null ? taskModel.Users.FirstOrDefault().UserId > 0 ? taskModel.Users.FirstOrDefault().UserId : 0 : 0;
                Task_Tbl taskDbNew = new Task_Tbl
                {
                    Task = taskModel.TaskName,
                    Start_Date = Convert.ToDateTime(taskModel.StartDate),
                    End_Date = Convert.ToDateTime(taskModel.EndDate),
                    Priority = taskModel.Priority,
                    Project_ID = taskModel.Users != null ? taskModel.Users.FirstOrDefault().Project != null ?
                    taskModel.Users.FirstOrDefault().Project.FirstOrDefault().ProjectID > 0 ? taskModel.Users.FirstOrDefault().Project.FirstOrDefault().ProjectID
                    : (int?)null : (int?)null : (int?)null,
                    Parent_ID = parentID > 0 ? parentID : (int?)null
                };
                string result = "{'TaskID': " + taskRep.CreateTask(taskDbNew, userID) + "}";
                JObject json = JObject.Parse(result);
                return Ok<JObject>(json);
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteTask(int TaskID)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            try
            {
                TaskManagerRepository TaskRep = new TaskManagerRepository();

                if (TaskID > 0)
                {
                    TaskRep.DeleteTask(TaskID);
                    return Ok();
                }
                else
                {
                    return BadRequest("Error occurred during data deletion in DeleteTask");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred in DeleteTask :" + ex.StackTrace);
            }
        }

        [HttpPut]
        public IHttpActionResult EditEndTask([FromBody]TaskModel taskModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            try
            {
                TaskManagerRepository taskRep = new TaskManagerRepository();

                Task_Tbl taskDb = taskRep.GetTaskRepo(taskModel.TaskId);

                if (taskDb != null)
                {
                    string result = "{'TaskID': " + taskRep.EditEndTask(taskModel.TaskId, taskModel.IsCompleted) + "}";
                    JObject json = JObject.Parse(result);
                    return Ok<JObject>(json);
                }
                else
                {
                    return BadRequest("Error occurred during data update in EditEndTask");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred in EditEndTask :" + ex.StackTrace);
            }
        }

    }
}
