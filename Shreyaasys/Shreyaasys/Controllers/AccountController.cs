using DotNetOpenAuth.GoogleOAuth2;
using Microsoft.AspNet.Membership.OpenAuth;
using Shreyaasys.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Shreyaasys.Controllers
{
    public class AccountController : Controller
    {

        public ActionResult Login()
        {
            string provider = "google";
            string returnUrl = "";
            return new ExternalLoginResult(provider, Url.Action("ExternalLoginCallback", new { ReturnUrl = returnUrl }));
        }

        internal class ExternalLoginResult : ActionResult
        {
            public ExternalLoginResult(string provider, string returnUrl)
            {
                Provider = provider;
                ReturnUrl = returnUrl;
            }

            public string Provider { get; private set; }
            public string ReturnUrl { get; private set; }

            public override void ExecuteResult(ControllerContext context)
            {
                OpenAuth.RequestAuthentication(Provider, ReturnUrl);
            }
        }

        [AllowAnonymous]
        public ActionResult ExternalLoginCallback(string returnUrl)
        {
            GoogleOAuth2Client.RewriteRequest();
            var redirectUrl = Url.Action("ExternalLoginCallback", new { ReturnUrl = returnUrl });
            var authResult = OpenAuth.VerifyAuthentication(redirectUrl);
            if (authResult.IsSuccessful)
            {
                var loggedEmailId = authResult.ExtraData["email"].ToString();
                if (loggedEmailId == "abhishekhotte@gmail.com" || loggedEmailId== "shreyaasys.rdg@gmail.com")
                {
                    FormsAuthentication.SetAuthCookie(authResult.UserName, false);
                    return Redirect(Url.Action("Index", "Home"));
                }
                else
                    return Redirect("https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:53165/account/unauthorizedaccess");
            }
            else
                return Redirect(Url.Action("Login", "Account"));

        }

        public  ActionResult UnauthorizedAccess()
        {
            return View();
        }


        /// <summary>
        /// Logout action(clears all Cookies & Session)
        /// </summary>
        /// <returns>Redirect to Home screen</returns>
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return Redirect("https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:53165/home");
        }
    }
}