using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shreyaasys.Models;
using System.IO;
using System.Net.Mail;
using System.Configuration;

namespace Shreyaasys.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PageNotFound()
        {
            return View();
        }

        public ActionResult Error()
        {
            return View();
        }

        #region Contact Us
        public ActionResult Contact()
        {
            return View();
        }

        public ActionResult SendAnEmailToUs(string name, string phone, string email, string msg)
        {
            try
            {
                string host = string.Empty, adminEmailId = string.Empty, adminPwd = string.Empty, shreyaasysEmailId=string.Empty;
                int portNo = int.Parse(ConfigurationManager.AppSettings["SmtpPort"].ToString());
                host   = ConfigurationManager.AppSettings["SmtpHost"].ToString();
                shreyaasysEmailId = ConfigurationManager.AppSettings["ShreyaasysEmalId"].ToString();
                adminEmailId = ConfigurationManager.AppSettings["EmailId"].ToString();
                adminPwd= ConfigurationManager.AppSettings["Password"].ToString();
                System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(adminEmailId, adminPwd);
                SmtpClient smtp = new SmtpClient();
                smtp.Host = host;
                smtp.Port = portNo;
                //smtp.EnableSsl = true;
                smtp.Credentials = credentials;

                MailMessage toCustomerMessage = new MailMessage();
                toCustomerMessage.From = new MailAddress(adminEmailId);
                toCustomerMessage.Subject = "Thank You - shreyaaSys Computers";
                toCustomerMessage.IsBodyHtml = true;
                toCustomerMessage.To.Add(new MailAddress(email));
                toCustomerMessage.Body = "<style>.box .box-primary {border-top-color: #12afd6;border-width: 3px;} .box {position: relative;border-radius: 3px;background: #ffffff;border-top: 3px solid #d2d6de;margin-bottom: 20px;width: 100%;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);}</style><div class='box box-primary vertical-space' id=''>Dear " + name + ",<br/><br/><div class='box-body with-border'>We have received your enquiry and will contact you within 1 business day.<br />You can also reach us by <b>+(91) 8495-253776</b><br/><br/>Regards,<br/>shreyaaSys Computers,<br/> Rayadurg</div><!-- /.box-body --></div>";
                smtp.Send(toCustomerMessage);

                MailMessage toAdminMessage = new MailMessage();
                toAdminMessage.From = new MailAddress(adminEmailId);
                toAdminMessage.Subject = "New Enquiry - shreyaaSys Computers";
                toAdminMessage.IsBodyHtml = true;
                toAdminMessage.To.Add(new MailAddress(shreyaasysEmailId));
                toAdminMessage.Body = "<style>.box .box-primary {border-top-color: #12afd6;border-width: 3px;} .box {position: relative;border-radius: 3px;background: #ffffff;border-top: 3px solid #d2d6de;margin-bottom: 20px;width: 100%;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);}</style><div class='box box-primary vertical-space' id=''>Dear Sreenivas,<br/><br/><div class='box-body with-border'>You have received an enquiry from <a href='http://shreyaasys.com' target='_blank'>www.shreyaasys.com</a><br /><br/><p><strong>Name&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong>: " + name + "<br /><strong>Email</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: " + email + "<br /><strong>Phone No</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : " + phone + "<br /><strong>Enquiry Details</strong>&nbsp; &nbsp;&nbsp;&nbsp;: " + msg + "</p></div><!-- /.box-body --></div>";
                smtp.Send(toAdminMessage);
                return Json(true);
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return Json(false);
            }

        }
        #endregion

        #region About Us
        public ActionResult About()
        {
            return View();
        }

        #region Gallery section
        [CustomAuthorize]
        [HttpPost]
        public ActionResult UploadGallery()
        {
            try
            {
                HttpFileCollectionBase files = Request.Files;
                string path = Server.MapPath("~/images/gallery");
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFileBase file = files[i];
                    var InputFileName = Path.GetFileName(file.FileName);
                    var ServerSavePath = Path.Combine(path + "\\" + InputFileName);

                    //Save file to server folder  

                    int count = 1;
                    checkIfFileExists:
                    if (System.IO.File.Exists(ServerSavePath))
                    {
                        ServerSavePath = Path.Combine(path + "\\" + InputFileName.Substring(0, InputFileName.LastIndexOf('.')) + count++ + InputFileName.Substring(InputFileName.IndexOf('.')));
                        goto checkIfFileExists;
                    }
                    else
                    {
                        file.SaveAs(ServerSavePath);
                    }

                }
                return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return Json("error", JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult GetGalleryPhotos()
        {
            try
            {
                string tmpImages = "";
                DirectoryInfo di = new DirectoryInfo(Server.MapPath("~/images/gallery"));
                FileSystemInfo[] files = di.GetFileSystemInfos();
                files.OrderBy(x => x.LastWriteTime).ToList();
                foreach (var item in files)
                {
                    var img = new FileInfo(item.FullName);
                    tmpImages += "<div class='col-sm-6 col-md-4 animation animated zoomIn fadeInUp' data-animation-delay='0s' style='animation-delay: 0s;'> <a class='lightbox' href='" + Url.Content(String.Format("~/images/gallery/{0}", img.Name)) + "'><img src = '" + Url.Content(String.Format("~/images/gallery/{0}", img.Name)) + "' /></a></div>";
                }
                return Json(new { result = "success", images = tmpImages }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return Json("error", JsonRequestBehavior.AllowGet);
            }
        }
        #endregion
        #endregion
                            
        #region Offers
        public ActionResult Offers(int? id)
        {
            try
            {
                var model = Tuple.Create(GetAnOfferDetails(id));
                return View(model);
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return View();
            }
        }

        public ActionResult GetAllOffers()
        {
            try
            {
                using (var dbContext = new shreayaaSysEntities())
                {
                    var list = dbContext.Offers.Select(s =>
                        new Services
                        {
                            Id = s.Id,
                            Name = s.Name,
                        }).ToList();
                    return Json(new { result = "success", list = list }, JsonRequestBehavior.AllowGet);

                }
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return Json(new { result = "error" }, JsonRequestBehavior.AllowGet);
            }
        }

        public string GetAnOfferDetails(int? id)
        {
            string tempOffers = string.Empty;
            try
            {
                using (var dbContext = new shreayaaSysEntities())
                {
                    var offersList = dbContext.Offers.Where(o=> (id==null ? o.Id != 0 : o.Id == id) ).Select(s =>
                        new
                        {
                            Id = s.Id,
                            Name = s.Name,
                            StartDate = s.StartDate.Value,
                            EndDate = s.EndDate.Value,
                            HtmlContent = s.HtmlContent
                        }).OrderByDescending(o=>o.EndDate).Take(1).ToList();
                    if (offersList != null)
                    {
                        offersList = offersList.Select(o => new
                        {
                            Id = o.Id,
                            Name = o.Name,
                            StartDate = o.StartDate,
                            EndDate = o.EndDate,
                            HtmlContent = o.HtmlContent
                        }).ToList();
                        string offerStatus = string.Empty, totalRemainingDays = string.Empty, offerEndsIn = string.Empty, expiryClass = string.Empty;
                        int remainingDays = 0;
                        bool offerIsActive = false;
                        //string offerIsActive = false;
                        foreach (var offer in offersList)
                        {
                            offerIsActive = offer.StartDate < DateTime.Now && DateTime.Now < offer.EndDate;
                            offerStatus = offerIsActive ? "label-success" : "label-danger";
                            remainingDays = (offer.EndDate - DateTime.Now).Days;
                            totalRemainingDays = remainingDays == 1 ? remainingDays + " day" : remainingDays + " days";
                            offerEndsIn = offerIsActive ? "Ends in " + totalRemainingDays : "Expired";
                            tempOffers += "<!-- timeline item --> <li><i id='liOfferId' data-id='"+offer.Id+"' class='fa fa-gift bg-blue'></i><div class='timeline-item'><span class='time label label-info ' style='margin-left:5px;'>";

                            if (User.Identity.IsAuthenticated)
                                tempOffers += "<i class='fa fa-edit' title='Edit' data-offer-id='" + offer.Id + "'></i>";

                            tempOffers += "</span> <span class='time label " + offerStatus + "' title='" + offer.EndDate.ToString("dd-MM-yyyy") + "'><i class='fa fa-clock-o' ></i> " + offerEndsIn + "</span><h3 class='timeline-header' id='divOfferEdit" + offer.Id + "'>" + offer.Name + "</h3><div data-start-date='" + offer.StartDate + "' data-end-date='" + offer.EndDate + "' id='divOffer" + offer.Id + "' class='timeline-body'>" + offer.HtmlContent + "</div>";

                            if (offerIsActive)
                                tempOffers += "<div class='timeline-footer'><div class=''><table style='margin-right: -120px;;float:right'><tr><td><div class='fb-share-button' data-href='/home/offers/" + offer.Id + "' data-layout='button_count' data-size='large' data-mobile-iframe='true'><a class='fb-xfbml-parse-ignore' target='_blank' href='/home/offers/" + offer.Id + "'>Share</a></div></td><td>&nbsp<div class='g-plus' data-action='share' data-width='200' data-height='30' data-href='/home/offers/" + offer.Id + "'></div></td></tr></table>  </div> </div></div>";
                            tempOffers += "</li>";
                        }
                        return tempOffers;
                    }
                    else
                        return string.Empty;
                    
                }
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return string.Empty;
            }

        }

        [CustomAuthorize]
        [ValidateInput(false)]
        public ActionResult AddUpdateOffer(Offer o)
        {
            try
            {
                using (var dbContext = new shreayaaSysEntities())
                {
                    if (o.Id == 0)
                        dbContext.Offers.Add(o);
                    else
                    {
                        var serviceObj = dbContext.Offers.Where(oo => oo.Id == o.Id).FirstOrDefault();
                        serviceObj.Name = o.Name;
                        serviceObj.StartDate = o.StartDate;
                        serviceObj.EndDate = o.EndDate;
                        serviceObj.HtmlContent = o.HtmlContent;
                    }
                    dbContext.SaveChanges();
                    return Json(new { result = "success", newId=o.Id }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return Json(new { result = "error" }, JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult UploadOffersPhoto(HttpPostedFileBase file)
        {
            try
            {
                if (Request.Files.Count > 0)
                {
                    file = Request.Files[0];
                    string extension = System.IO.Path.GetExtension(file.FileName);
                    string ImgPath = "~/images/offers/";
                    string fname = DateTime.Now.ToString("yyyyddmmhhmmssss");
                    string path = System.IO.Path.Combine(Server.MapPath(ImgPath), fname + extension);
                    if (!Directory.Exists(Server.MapPath(ImgPath)))
                        Directory.CreateDirectory(Server.MapPath(ImgPath));
                    file.SaveAs(path);
                    return Json(new { result = "success", imgUrl= "/images/offers/" + fname + extension }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return Json(new { result = "error" }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { result = "error" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeleteUnsavedOfferImages(string[] images)
        {
            try
            {
                if (images != null)
                {
                    foreach (var item in images)
                    {
                        string image = Server.MapPath(item.Replace("../..", "~"));
                        if (System.IO.File.Exists(image))
                            System.IO.File.Delete(image);
                    }
                }
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Services
        public ActionResult Services(int? id)
        {
            using (var dbContext=new shreayaaSysEntities())
            {
                if (id == null)
                {
                    if(dbContext.Services.Count()>0)
                        id = dbContext.Services.OrderBy(s => s.Id).FirstOrDefault().Id;
                }
                var obj = dbContext.Services.Where(s=>s.Id==id).Select(s => 
                new Services
                {
                    Id = s.Id, Name = s.Name, HtmlContent = s.HtmlContent
                }).FirstOrDefault();
                return View(obj);
            }
        }

        public ActionResult GetAllServices()
        {
            try
            {
                using (var dbContext = new shreayaaSysEntities())
                {
                    var list = dbContext.Services.Select(s =>
                        new Services
                        {
                            Id = s.Id,
                            Name = s.Name,
                        }).ToList();
                    return Json(new { result = "success",list= list }, JsonRequestBehavior.AllowGet);

                }
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return Json(new { result = "error" }, JsonRequestBehavior.AllowGet);
            }
            
        }

        [CustomAuthorize]
        [ValidateInput(false)]
        public ActionResult AddUpdateService(Service s)
        {
            try
            {
                using (var dbContext = new shreayaaSysEntities())
                {
                    if (s.Id == 0)
                        dbContext.Services.Add(s);
                    else
                    {
                        var serviceObj = dbContext.Services.Where(ss => ss.Id == s.Id).FirstOrDefault();
                        serviceObj.Name = s.Name;
                        serviceObj.HtmlContent = s.HtmlContent;
                    }
                    dbContext.SaveChanges();
                    return Json(new {result="success", obj=s },JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return Json(new { result = "error" }, JsonRequestBehavior.AllowGet);
            }

        }
        #endregion

        #region Clients
        public ActionResult Clients()
        {
            return View();
        }

        public ActionResult GetAllClients()
        {
            try
            {
                using (var dbcontext = new shreayaaSysEntities())
                {
                    var list = dbcontext.Clients.Select(c => new { Id = c.Id, Name = c.Name }).ToList();
                    string tempClient = string.Empty;
                    foreach (var client in list)
                    {
                        tempClient+= "<div class='col-lg-5 col-lg-offset-1'><div class='client-edit animation animated fadeInDown' data-animation='fadeInDown' data-animation-delay='0s' style='animation-delay: 0s;'><table style='width:100%'><tr style='padding-left:10px;' ><td><span class='fa fa-arrow-right client-listing'></span><span class='clients-txt-overflow'  title='" + client.Name + "'>" + client.Name + "</span></td>";

                        if (User.Identity.IsAuthenticated)
                            tempClient += "<td style='text-align:right'><span class='fa fa-edit data-client-edit' style='cursor:pointer'  title='Edit' data-client-name='" + client.Name + "' data-id='" + client.Id + "'></span></td>";

                        tempClient += "</tr></table></div></div>";
                    }
                    return Json(new { result="success",htmlData=tempClient }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return Json(new { result = "error"}, JsonRequestBehavior.AllowGet);
            }
            
        }

        [CustomAuthorize]
        public ActionResult AddUpdateClients(int id, string name)
        {
            try
            {
                using (var dbcontext=new shreayaaSysEntities())
                {
                    var client = dbcontext.Clients.Where(cli => cli.Id == id).FirstOrDefault();
                    if (client !=null)
                        client.Name = name;
                    else
                        dbcontext.Clients.Add(new Client { Id=id, Name=name });
                    dbcontext.SaveChanges();
                    return Json(new { result = "success" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                WriteLogs.Write(ex);
                return Json(new { result = "error" }, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion
        
    }
}