<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TableEdit.aspx.cs" Inherits="ReshitScheduler.TableEdit" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        hello
        <asp:GridView ID="TableGrid" runat="server" AutoGenerateEditButton="True" ShowWhenEmpty="True" OnRowCancelingEdit="TableGrid_RowCancelingEdit" OnRowEditing="TableGrid_RowEditing" OnRowUpdating="TableGrid_RowUpdating" ShowFooter="True" OnDataBinding="TableGrid_DataBinding" OnDataBound="TableGrid_DataBound" OnRowCreated="TableGrid_RowCreated" OnRowDataBound="TableGrid_RowDataBound">
        <FooterStyle BackColor="White" ForeColor="#000066"></FooterStyle>
        </asp:GridView>
    
    </div>

        <asp:Button ID="btnBack" runat="server" OnClick="btnBack_Click" Text="Back" />
    </form>
</body>
</html>
