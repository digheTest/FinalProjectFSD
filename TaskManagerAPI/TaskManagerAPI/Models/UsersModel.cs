using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskManagerAPI.Models
{
    public class UsersModel
    {
        //TaskID for TaskModel
        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int EmpID { get; set; }

        public IEnumerable<ProjectModel> Project { get; set; }

    }
}
