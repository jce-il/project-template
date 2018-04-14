using Data;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ReshitScheduler
{
    public partial class TableEdit : System.Web.UI.Page
    {
        public static string strTableName;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (strTableName == null)
            {
                strTableName = "teachers";
            }
            if (!this.IsPostBack || TableGrid.EditIndex == -1)
            {
                this.FillGrid();
            }
            //this.FillGrid();

        }

        private void FillGrid()
        {
            DBConnection dbcConnection = DBConnection.Instance();
            DataTable dtTable = dbcConnection.GetAllDataFromTable(strTableName);

            TableGrid.DataSource = dtTable;
            TableGrid.DataBind();
            

        }

        private void ReplaceForeignKeys()
        {
            DBConnection dbcConnection = DBConnection.Instance();
            DataTable dtDataSource = (DataTable)TableGrid.DataSource;
            DataTable dtForeignKeys = dbcConnection.GetForeignKeys(dtDataSource.TableName);


            foreach (DataRow drCurrentKey in dtForeignKeys.Rows)
            {
                int nColumnIndex = 0;
                for (int nCurrentColumn = 0; nCurrentColumn < dtDataSource.Columns.Count; nCurrentColumn++)
                {
                    if (dtDataSource.Columns[nCurrentColumn].ColumnName == drCurrentKey[0].ToString())
                    {
                        nColumnIndex = nCurrentColumn+1;
                        nCurrentColumn = dtDataSource.Columns.Count;
                    }
                }
                DataTable dtKeyData = dbcConnection.GetConstraintDataTable(drCurrentKey[1].ToString());
                foreach (GridViewRow dvrCurrentRow in TableGrid.Rows)
                {
                    //DropDownList ddlData = new DropDownList();
                    //ddlData.DataSource = dtKeyData;
                    //ddlData.DataValueField = "id";
                    //ddlData.DataTextField = "name";
                    //ddlData.DataBind();
                    //ddlData.Enabled = TableGrid.EditIndex != -1;//allow edit only in edit mode
                    DropDownList ddlData = new DropDownList();
                    ddlData.DataSource = dtKeyData;
                    ddlData.DataValueField = "id";
                    ddlData.DataTextField = "name";
                    ddlData.ID = "DDL" + drCurrentKey[1].ToString();
                    ddlData.DataBind();

                        dvrCurrentRow.Cells[nColumnIndex].Controls.Add(ddlData);
                        ddlData.SelectedIndexChanged += DdlData_SelectedIndexChanged;
                    if (TableGrid.EditIndex != dvrCurrentRow.RowIndex)
                    {
                        ddlData.Visible = false;
                        dvrCurrentRow.Cells[nColumnIndex].Text = dtKeyData.Select("id = " + dvrCurrentRow.Cells[nColumnIndex].Text)[0]["name"].ToString();
                    }
                    else
                    {
                        
                        dvrCurrentRow.Cells[nColumnIndex].Controls[0].Visible = false;
                        
                    }
                }
            }
        }

        public void DdlData_SelectedIndexChanged(object sender, EventArgs e)
        {
            DropDownList ddlSender = (DropDownList)sender;
            ((TextBox)ddlSender.Parent.Controls[0]).Text = ddlSender.SelectedValue;
        }


        //PopulateEmpty data for GridView 
        public DataTable GetEmptyDataTable(DataTable dtOriginalTable)
        {
            DataTable dtEmpty = new DataTable();

            foreach (DataColumn dcCurrentColumn in dtOriginalTable.Columns)
            {
                dtEmpty.Columns.Add(dcCurrentColumn.ColumnName, dcCurrentColumn.DataType);
            }
            DataRow dataRow = dtEmpty.NewRow();

            //Inserting a new row,datatable .newrow creates a blank row
            dtEmpty.Rows.Add(dataRow);//adding row to the datatable
            return dtEmpty;
        }

        private void BtnAdd_Click(object sender, EventArgs e)
        {
            GridViewRow row = TableGrid.FooterRow;
            DBConnection dbcConnection = DBConnection.Instance();
            if (!dbcConnection.InsertTableRow(strTableName, row))
            {
                Helper.ShowMessage(ClientScript, GetType(), "error saving");
            }
            TableGrid.EditIndex = -1;
            this.FillGrid();
        }

        protected void TableGrid_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            GridViewRow row = TableGrid.Rows[e.RowIndex];
            int nId = Convert.ToInt32(TableGrid.DataKeys[e.RowIndex].Values[0]);
            DBConnection dbcConnection = DBConnection.Instance();
            if(!dbcConnection.UpdateTableRow(strTableName, nId, row))
            {
                Helper.ShowMessage(ClientScript, GetType(), "error saving");
            }
            TableGrid.EditIndex = -1;
            this.FillGrid();
        }

        protected void TableGrid_RowEditing(object sender, GridViewEditEventArgs e)
        {
            TableGrid.EditIndex = e.NewEditIndex;
            this.FillGrid();
            
        }

        protected void TableGrid_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            TableGrid.EditIndex = -1;
            this.FillGrid();
        }

        protected void btnBack_Click(object sender, EventArgs e)
        {
                        Response.Redirect("AdminForm.aspx");

        }

        protected void TableGrid_DataBinding(object sender, EventArgs e)
        {
            
        }

        protected void TableGrid_RowCreated(object sender, GridViewRowEventArgs e)
        {
            int a = 4;
            a++;
        }

        protected void TableGrid_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            int a = 4;
            a++;
        }

        protected void TableGrid_DataBound(object sender, EventArgs e)
        {
            DataTable dtTable = ((DataTable)TableGrid.DataSource);

            TableGrid.DataKeyNames = dtTable.PrimaryKey.Select(pk => pk.ColumnName).ToArray();
            ReplaceForeignKeys();

            //footer for insert
            if (TableGrid.EditIndex == -1) // not in edit mode
            {


                if (dtTable.Rows.Count == 0) // the table is empty 
                {
                    dtTable = GetEmptyDataTable(dtTable);
                    TableGrid.DataSource = dtTable;
                    TableGrid.DataBind();
                }
                Button btnAdd = new Button() { Text = "Add", OnClientClick = "BtnAdd_Click" };
                btnAdd.Click += BtnAdd_Click;
                TableGrid.FooterRow.Cells[1].Controls.Add(btnAdd);
                foreach (DataControlFieldCell CurrentField in TableGrid.FooterRow.Cells)
                {
                    if (CurrentField.ContainingField is AutoGeneratedField)
                    {
                        string strFieldName = (CurrentField.ContainingField as AutoGeneratedField).DataField;
                        if (strFieldName != "id")
                        {
                            CurrentField.Controls.Add(new TextBox() { ID = strFieldName });
                        }
                    }
                }
            }
        }
    }
}