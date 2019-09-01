using System.Linq;
using TaskManagerReference;

namespace TaskManagerReference
{

    public class TaskManagerRepository
    {
        public IQueryable<Parent_Task_Tbl> GetAllParentTasksRepo()
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            return tmdb.Parent_Task_Tbl;
        }

        public IQueryable<Task_Tbl> GetAllTaskRepo()
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            return tmdb.Task_Tbl.Where(t => (t.Parent_ID == null || t.Parent_ID == 0) && t.Project_ID != null);
        }
        public Task_Tbl GetTaskRepo(int TaskID)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            return tmdb.Task_Tbl.Where(p => p.Task_ID == TaskID).Select(p => p).FirstOrDefault();
        }
        public IQueryable<Project_Tbl> GetAllProjectsRepo()
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            return tmdb.Project_Tbl;
        }
        public IQueryable<User_Tbl> GetAllUsersRepo()
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            return tmdb.User_Tbl;
        }
        public int CreateParentTask(Parent_Task_Tbl ParentTask)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            tmdb.Parent_Task_Tbl.Add(ParentTask);
            tmdb.SaveChanges();
            return ParentTask.Parent_ID;
        }

        public int EditParentTask(Parent_Task_Tbl parentTask)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            Parent_Task_Tbl parentTaskDb = tmdb.Parent_Task_Tbl.Find(parentTask.Parent_ID);
            tmdb.Entry(parentTaskDb).CurrentValues.SetValues(parentTask);
            tmdb.SaveChanges();
            updateTaskStatusPerProject();
            return parentTask.Parent_ID;
        }

        public Parent_Task_Tbl getParent(int parentTaskID)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            return tmdb.Parent_Task_Tbl.Where(p => p.Parent_ID == parentTaskID).Select(p => p).FirstOrDefault();
        }

        public int CreateTask(Task_Tbl Task, int userID)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            tmdb.Task_Tbl.Add(Task);
            tmdb.SaveChanges();
            if (userID > 0)
            {
                User_Tbl userDd = tmdb.User_Tbl.Where(u => u.User_ID == userID).FirstOrDefault();
                User_Tbl user = new User_Tbl()
                {
                    User_ID = userDd.User_ID,
                    First_Name = userDd.First_Name,
                    Last_Name = userDd.Last_Name,
                    Task_ID = Task.Task_ID,
                    Project_ID = Task.Project_ID,
                    Employee_ID = userDd.Employee_ID
                };

                user.Task_ID = Task.Task_ID;
                tmdb.Entry(userDd).CurrentValues.SetValues(user);
                tmdb.SaveChanges();
            }
            updateTaskStatusPerProject();
            return Task.Task_ID;
        }
        public int EditTask(Task_Tbl Task)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            Task_Tbl TaskDb = tmdb.Task_Tbl.Find(Task.Task_ID);
            tmdb.Entry(TaskDb).CurrentValues.SetValues(Task);
            tmdb.SaveChanges();
            updateTaskStatusPerProject();
            return Task.Task_ID;
        }
        public int DeleteTask(int TaskID)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            Task_Tbl taskTbl = tmdb.Task_Tbl.Where(t => t.Task_ID == TaskID).FirstOrDefault();
            tmdb.Task_Tbl.Remove(taskTbl);
            return tmdb.SaveChanges();
        }
        public int EditEndTask(int taskID, bool IsCompleted)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            Task_Tbl TaskDb = tmdb.Task_Tbl.Find(taskID);
            TaskDb.Is_Completed = IsCompleted;
            tmdb.SaveChanges();
            updateTaskStatusPerProject();
            return taskID;
        }
        public int addUser(User_Tbl user)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            tmdb.User_Tbl.Add(user);
            tmdb.SaveChanges();
            return user.User_ID;
        }

        public User_Tbl getUser(int userID)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            return tmdb.User_Tbl.Where(u => u.User_ID == userID).Select(u => u).FirstOrDefault();
        }
        public User_Tbl getUserFromProjectID(int projectID)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            return tmdb.User_Tbl.Where(u => u.Project_ID == projectID).Select(u => u).FirstOrDefault();
        }
        public int editUser(User_Tbl user)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            User_Tbl userDb = tmdb.User_Tbl.Find(user.User_ID);
            tmdb.Entry(userDb).CurrentValues.SetValues(user);
            tmdb.SaveChanges();
            return user.User_ID;
        }
        public int deleteUser(int userID)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            User_Tbl user = tmdb.User_Tbl.Where(u => u.User_ID == userID).FirstOrDefault();
            tmdb.User_Tbl.Remove(user);
            return tmdb.SaveChanges();
        }
        public IQueryable<User_Tbl> getAllUsers()
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            return tmdb.User_Tbl;
        }
        public int addProject(Project_Tbl project, int userID)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            tmdb.Project_Tbl.Add(project);
            tmdb.SaveChanges();
            if (userID > 0)
            {
                User_Tbl user = tmdb.User_Tbl.Where(u => u.User_ID == userID).FirstOrDefault();
                user.Project_ID = project.Project_ID;
                tmdb.Entry(user).CurrentValues.SetValues(user.Project_ID);
                tmdb.SaveChanges();
            }
            return project.Project_ID;
        }
        public int editProject(Project_Tbl project, int userID)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            Project_Tbl projectDb = tmdb.Project_Tbl.Find(project.Project_ID);
            tmdb.Entry(projectDb).CurrentValues.SetValues(project);
            if (userID > 0)
            {
                User_Tbl user = tmdb.User_Tbl.Where(u => u.User_ID == userID).FirstOrDefault();
                user.Project_ID = project.Project_ID;
                tmdb.Entry(user).CurrentValues.SetValues(user.Project_ID);
                tmdb.SaveChanges();
            }
            return project.Project_ID;
        }

        public int deleteProject(int projectID)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            Project_Tbl projectDb = tmdb.Project_Tbl.Where(t => t.Project_ID == projectID).FirstOrDefault();
            tmdb.Project_Tbl.Remove(projectDb);
            return tmdb.SaveChanges();
        }
        public IQueryable<Project_Tbl> getAllProjects()
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            return tmdb.Project_Tbl;
        }
        public Project_Tbl getProject(int projectID)
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();
            return tmdb.Project_Tbl.Where(p => p.Project_ID == projectID).Select(p => p).FirstOrDefault();
        }

        public void updateTaskStatusPerProject()
        {
            TaskManagerDbEntities tmdb = new TaskManagerDbEntities();

            foreach (var projectID in tmdb.Task_Tbl.Where(t => t.Project_ID > 0).Select(t => t.Project_ID).ToList())
            {
                Project_Tbl projectDb = tmdb.Project_Tbl.Where(p => p.Project_ID == projectID).FirstOrDefault();
                if (projectDb != null)
                {
                    projectDb.No_Tasks = tmdb.Task_Tbl.Where(t => t.Project_ID == projectID).ToList().Count();
                    projectDb.Completed_Tasks = tmdb.Task_Tbl.Where(t => t.Project_ID == projectID && t.Is_Completed == true).ToList().Count();
                    tmdb.Entry(projectDb).CurrentValues.SetValues(projectDb.No_Tasks);
                    tmdb.SaveChanges();
                    tmdb.Entry(projectDb).CurrentValues.SetValues(projectDb.Completed_Tasks);
                    tmdb.SaveChanges();
                }
            }
        }
    }
}

