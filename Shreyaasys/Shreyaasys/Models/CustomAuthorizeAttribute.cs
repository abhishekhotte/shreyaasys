using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Shreyaasys.Models
{
    public class CustomAuthorizeAttribute : ActionFilterAttribute
    {
        string RoleName = string.Empty;

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.User.Identity == null || !filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                FormsAuthentication.SignOut();
                filterContext.HttpContext.Session.Abandon();
                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.HttpContext.Response.StatusCode = 253;
                    filterContext.HttpContext.Response.End();
                }
                else
                {
                    filterContext.Result = new RedirectResult("../Account/Login");
                }
            }
        }
    }
}