using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Shreyaasys.Startup))]
namespace Shreyaasys
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
