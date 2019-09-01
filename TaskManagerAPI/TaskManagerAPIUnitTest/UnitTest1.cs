using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TaskManagerAPI.Controllers;
using TaskManagerAPI.Models;
using Newtonsoft.Json.Linq;
using NBench;
using TaskManagerReference;

namespace TaskManagerAPIUnitTest
{

    [TestClass]
    public class UnitTest1
    {
        private Counter _opCounter;
        private ValuesController _controller = new ValuesController();
        [TestMethod]
        public void Get()
        {
            // Act on Test  
            var response = _controller.Get();
            var contentResult = response as IEnumerable<ParentTaskModel>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
        [TestMethod]
        public void CreateParentTask()
        {
            // Act on Test  
            ParentTaskModel parentTask = new ParentTaskModel()
            {
                ParentTaskName = "New Task",
            };

            IHttpActionResult response = _controller.ManageParentTask(parentTask);
            var contentResult = response as OkNegotiatedContentResult<JObject>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
        [PerfSetup]
        public void SetUp(BenchmarkContext context)
        {
            _opCounter = context.GetCounter("MyCounter");
        }

        [PerfBenchmark(NumberOfIterations = 5, RunMode = RunMode.Throughput, RunTimeMilliseconds = 1000, TestMode = TestMode.Measurement)]
        [CounterMeasurement("MyCounter")]
        [MemoryMeasurement(MemoryMetric.TotalBytesAllocated)]
        public void BenchMarkMethod(BenchmarkContext context)
        {
            Get();
            _opCounter.Increment();
        }
        [TestMethod]
        public void ManageTask()
        {

            // Act on Test  
            List<TaskModel> tasks = new List<TaskModel>();
            TaskModel task = new TaskModel()
            {
                TaskName = "New Child Task",
                Priority = 1,
                StartDate = "10-08-2019",
                EndDate = "10-10-2019",
                IsCompleted = false,
            };
            tasks.Add(task);

            ParentTaskModel parentTask = new ParentTaskModel()
            {
                ParentTaskID = -1,
                ParentTaskName = "New Parent Task",
                Task = tasks,
            };

            IHttpActionResult response = _controller.ManageTask(parentTask);
            var contentResult = response as OkNegotiatedContentResult<JObject>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
        [TestMethod]
        public void EditEndTask()
        {
            TaskModel task = new TaskModel()
            {
                TaskId = 6007,
                TaskName = "Wow Good!!",
                Priority = 1,
                StartDate = "10-11-2019",
                EndDate = "10-12-2019",
                IsCompleted = true,
            };

            IHttpActionResult response = _controller.EditEndTask(task);
            var contentResult = response as OkNegotiatedContentResult<JObject>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
        [TestMethod]
        public void DeleteTask()
        {
            IHttpActionResult response = _controller.DeleteTask(6008);
            // Assert the result  
            Assert.IsNotNull(response.ToString().Contains(""));
        }

        [TestMethod]
        public void AddUser()
        {
            UsersModel user = new UsersModel()
            {
                FirstName = "Nitin",
                LastName = "Dighe",
                EmpID = 1134,
            };
            IHttpActionResult response = _controller.addUser(user);
            var contentResult = response as OkNegotiatedContentResult<JObject>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
        [TestMethod]
        public void EditUser()
        {
            UsersModel user = new UsersModel()
            {
                UserId = 1,
                FirstName = "Nitin",
                LastName = "Dighe",
                EmpID = 1143,
            };
            IHttpActionResult response = _controller.editUser(user);
            var contentResult = response as OkNegotiatedContentResult<JObject>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
        [TestMethod]
        public void GetUser()
        {
            UsersModel user = new UsersModel()
            {
                UserId = 1002
            };
            UsersModel response = _controller.getUser(user.UserId);
            // Assert the result  
            Assert.IsNotNull(response);
        }
        [TestMethod]
        public void GetAllUser()
        {
            IEnumerable<UsersModel> users = _controller.getAllUsers();
            Assert.IsNotNull(users);
        }
        [TestMethod]
        public void DeleteUser()
        {
            IHttpActionResult response = _controller.deleteUser(2);
            var contentResult = response as OkNegotiatedContentResult<JObject>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
        [TestMethod]
        public void AddProject()
        {
            UsersModel user = new UsersModel()
            {
                UserId = 1,
            };
            List<UsersModel> users = new List<UsersModel>();
            users.Add(user);
            ProjectModel project = new ProjectModel()
            {
                ProjectName = "TestProject",
                StartDate = "10-08-2019",
                EndDate = "10-10-2019",
                Priority = 10,
                Users = users,
            };
            IHttpActionResult response = _controller.addProject(project);
            var contentResult = response as OkNegotiatedContentResult<JObject>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
        [TestMethod]
        public void EditProject()
        {
            UsersModel user = new UsersModel()
            {
                UserId = 1,
            };
            List<UsersModel> users = new List<UsersModel>();
            users.Add(user);
            ProjectModel project = new ProjectModel()
            {
                ProjectID = 2,
                ProjectName = "TestProject",
                StartDate = "10-08-2019",
                EndDate = "10-10-2019",
                Priority = 10,
                Users = users,
            };
            IHttpActionResult response = _controller.editProject(project);
            var contentResult = response as OkNegotiatedContentResult<JObject>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
        [TestMethod]
        public void GetAllProjects()
        {
            IEnumerable<ProjectModel> projects = _controller.getAllProjects();
            Assert.IsNotNull(projects);
        }
        [TestMethod]
        public void GetProject()
        {
            ProjectModel result = _controller.getProject(3);
            Assert.IsNotNull(result);
        }
        [TestMethod]
        public void DeleteProject()
        {
            IHttpActionResult response = _controller.deleteProject(2);
            var contentResult = response as OkNegotiatedContentResult<JObject>;
            // Assert the result  
            Assert.IsNotNull(contentResult);
        }
    }

}
