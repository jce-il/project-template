using System;

namespace ReshitScheduler
{
    
    public partial class MainForm : System.Web.UI.Page
    {
        public static Teacher LoggedInTeacher;
        protected void Page_Load(object sender, EventArgs e)
        {
            TeacherName.Text = LoggedInTeacher.FirstName + " " + LoggedInTeacher.LastName;
            //LoggedInTeacher = new Teacher();
        }
    }
}