using Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ReshitScheduler
{
    public partial class AdminForm : System.Web.UI.Page
    {
        public static Teacher LoggedInTeacher;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (LoggedInTeacher != null)
            {
                AdminName.Text = LoggedInTeacher.FirstName + " " + LoggedInTeacher.LastName;
                PopulateMenu();
            }
            else
            {
                Response.Redirect("LoginForm.aspx");
            }

        }
        private void PopulateMenu()
        {
            DataTable dtTables = DBConnection.Instance().GetDataTableByQuery("select table_name from INFORMATION_SCHEMA.tables where table_schema = 'reshit'");
            foreach (DataRow CurrentTable in dtTables.Rows)
            {
                MenuItem categoryItem = new MenuItem("edit " + CurrentTable["table_name"] + " table", (string)CurrentTable["table_name"]);
                Menu1.Items.Add(categoryItem);
            }
        }

        protected void Menu1_MenuItemClick(object sender, MenuEventArgs e)
        {
            TableEdit.strTableName = e.Item.Value;
            Response.Redirect("TableEdit.aspx");

        }
    }
}