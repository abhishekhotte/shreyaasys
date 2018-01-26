using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Shreyaasys.Models
{
    public class Login
    {
        [Required]
        [RegularExpression(@"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$", ErrorMessage = "Invalid Email Id")]
        [Display(Name = "Email Id")]
        public string EmailId { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(20, ErrorMessage = "Password minimum length should be 6 ", MinimumLength = 6)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}