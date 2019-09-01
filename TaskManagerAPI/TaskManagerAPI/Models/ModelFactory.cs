using System;
using System.Linq;
using TaskManagerReference;

namespace TaskManagerAPI.Models
{
    public class ModelFactory
    {
        public ParentTaskModel GetParentTaskMoDel(Parent_Task_Tbl parentTaskTbl)
        {
            return new ParentTaskModel()
            {
                ParentTaskID = parentTaskTbl.Parent_ID,
                ParentTaskName = parentTaskTbl.Parent_Task,
                Task = parentTaskTbl.Task_Tbl.Select(t => getTaskModel(t))
            };
        }

        public TaskModel getTaskModel(Task_Tbl task)
        {
            return new TaskModel()
            {
                TaskId = task.Task_ID,
                TaskName = task.Task,
                StartDate = Convert.ToString(task.Start_Date),
                EndDate = Convert.ToString(task.End_Date),
                Priority = Convert.ToInt32(task.Priority),
                IsCompleted = Convert.ToBoolean(task.Is_Completed),
                Users = task.User_Tbl.Select(u => getUsersModel(u))
            };
        }
        public ProjectModel getProjectModel(Project_Tbl project)
        {
            return new ProjectModel()
            {
                ProjectID = project.Project_ID,
                ProjectName = project.Project,
                StartDate = Convert.ToString(project.Start_Date),
                EndDate = Convert.ToString(project.End_Date),
                Priority = Convert.ToInt32(project.Priority),
                NoTasks = Convert.ToInt32(project.No_Tasks),
                NoCompletedTasks = Convert.ToInt32(project.Completed_Tasks),
                Users = project.User_Tbl.Select(u => getUsersModel(u))
            };
        }
        public UsersModel getUsersModel(User_Tbl user)
        {
            return new UsersModel()
            {
                UserId = user.User_ID,
                FirstName = user.First_Name,
                LastName = user.Last_Name,
                EmpID = Convert.ToInt32(user.Employee_ID)
            };
        }
    }
}