<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LoginForm.aspx.cs" Inherits="ReshitScheduler.LoginForm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel = "stylesheet" href = "css/login.css" />
    <script type="text/javascript" src="js/login.js"></script>
    <title>Reshit Scheduler</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <!--User Name:<input id="Text1" type="text" /><br />
            Password:<input id="Password1" type="password" />-->
            <div class="login-page">
                <div class="form">

                    Welcome to Reshit Scheduler.<br />
                    Please Login<br />
                    <asp:TextBox ID="Username" runat="server" placeholder="username"></asp:TextBox>
                    <asp:TextBox ID="Password" runat="server" placeholder="password" TextMode="Password"></asp:TextBox>
                    
                    <asp:Button ID="Button1" CssClass="button" runat="server" OnClick="Button1_Click" Text="login" />
                    

                </div>
            </div>
        </div>
    </form>
</body>
</html>

