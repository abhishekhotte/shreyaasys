using System.Web;
using System.Web.Optimization;

namespace Shreyaasys
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                        "~/Scripts/jquery.min.js",
                        "~/Scripts/bootstrap.min.js",
                        "~/Scripts/slick.min.js",
                        "~/Scripts/jquery.flexslider-min.js",
                        "~/Scripts/jquery.fancybox.pack.js",
                        "~/Scripts/main.js",
                        "~/Scripts/custom.js",
                        "~/Scripts/moment.js"
                        ));
          
            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/flexslider.css",
                      "~/Content/jquery.fancybox.css",
                      "~/Content/animate.min.css",
                      "~/Content/slick.css",
                      "~/Content/main.css",
                      "~/Content/AdminLTE.css",
                      "~/content/custom.css"
                      ));
        }
    }
}
