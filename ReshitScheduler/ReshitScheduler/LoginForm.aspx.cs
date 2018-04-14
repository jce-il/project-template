using Data;
using MySql.Data.MySqlClient;
using System;
using System.Data;

namespace ReshitScheduler
{
    public partial class LoginForm : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {

            DBConnection dbcConnection = DBConnection.Instance();
            string strQuery = "SELECT teachers.id,first_name,last_name,teacher_types.teacher_type_name " +
                           "FROM teachers " +
                           "inner join teacher_types on teacher_types.id = teachers.teacher_type_id " +
                           "where user_name ='" + Username.Text + "' " +
                           "and password = '" + Password.Text + "'";
            DataTable dtLoginData = dbcConnection.GetDataTableByQuery(strQuery);
            if (dtLoginData != null && dtLoginData.Rows[0][0] != null)
            {
                Teacher LoggedInTeacher = new Teacher()
                {
                    Id = int.Parse(dtLoginData.Rows[0][0].ToString()),
                    FirstName = dtLoginData.Rows[0][1].ToString(),
                    LastName = dtLoginData.Rows[0][2].ToString(),
                    Type = dtLoginData.Rows[0][3].ToString()
                };
                ClientScript.RegisterStartupScript(this.GetType(), "myalert", "alert('Hello " + LoggedInTeacher.FirstName + " " + LoggedInTeacher.LastName + "');", true);

                if (LoggedInTeacher.Type == "admin")
                {
                    AdminForm.LoggedInTeacher = LoggedInTeacher;
                    Response.Redirect("AdminForm.aspx");
                }
                else
                {
                    MainForm.LoggedInTeacher = LoggedInTeacher;

                    Response.Redirect("MainForm.aspx");
                }
            }
            else
            {
                ClientScript.RegisterStartupScript(this.GetType(), "myalert", "alert('wrong username or password');", true);
            }



        }
    }
}