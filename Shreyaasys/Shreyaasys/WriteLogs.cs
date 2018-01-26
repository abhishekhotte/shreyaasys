using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Shreyaasys
{
    public class WriteLogs
    {
        public static void Write(Exception obj)
        {
            string path = HttpContext.Current.Server.MapPath("~\\Logs");
            string file = path + "\\Log_" + DateTime.Now.ToString("dd_MMM_yyyy") + ".txt";
            FileStream fs = null;
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            if (!File.Exists(file))
                fs = File.Create(file);
            else
                fs = File.Open(file, FileMode.Append, FileAccess.Write);

            StreamWriter sw = new StreamWriter(fs);
            sw.WriteLine("-----------------------------------");
            sw.WriteLine("Date Time: " + DateTime.Now.ToString());
            sw.WriteLine("Message: " + obj.Message);
            sw.WriteLine("Exception: " + obj.StackTrace);
            sw.Close();
            fs.Close();
            fs.Dispose();
        }
    }
}