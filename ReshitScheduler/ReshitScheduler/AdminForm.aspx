<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AdminForm.aspx.cs" Inherits="ReshitScheduler.AdminForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel = "stylesheet" href = "css/login.css" />
    <title>admin page</title>
</head>
<body dir ="rtl">
    
        <form id="form1" runat="server">
            <div dir ="rtl">
    
                שלום
                <asp:Label ID="AdminName" runat="server" Text="Label"></asp:Label>
    
                <br />
                <asp:Menu ID="Menu1" runat="server" OnMenuItemClick="Menu1_MenuItemClick">
                    <Items>
                    </Items>
                </asp:Menu>
    
            </div>
        </form>
    </div>
</body>
</html>
