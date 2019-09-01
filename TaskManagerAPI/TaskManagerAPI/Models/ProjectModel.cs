using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskManagerAPI.Models
{
    public class ProjectModel
    {
        //TaskID for TaskModel
        public int ProjectID { get; set; }
        public string ProjectName { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public int Priority { get; set; }

        public int NoTasks { get; set; }
        public int NoCompletedTasks { get; set; }

        public IEnumerable<UsersModel> Users { get; set; }

    }
}
