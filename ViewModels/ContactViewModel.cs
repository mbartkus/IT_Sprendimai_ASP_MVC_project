using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IT_Sprendimai.ViewModels
{
    public class ContactViewModel
    {
        [Required] 
       [MinLength(4, ErrorMessage = "Per trumpas!") ]
        public string Email { set; get; }
        [Required]
        [MinLength(4, ErrorMessage = "Per trumpas!")]
        public string Subject { set; get; }
        [Required]
        [MinLength(3, ErrorMessage = "Per trumpas!")]
        public string Name { set; get; }
        [Required]
        [MinLength(3, ErrorMessage = "Per trumpas!")]
        [MaxLength(450, ErrorMessage = "Per ilgas!")]
        public string Message { set; get; }
        



    }
}
