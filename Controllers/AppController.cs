using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IT_Sprendimai.Services;
using IT_Sprendimai.ViewModels;
using  IT_Sprendimai.Data;
using Microsoft.AspNetCore.Authorization;

namespace IT_Sprendimai.Controllers

{
    public class AppController : Controller
    {
        private readonly IMailService _manoMailServisas;
        private readonly IDataRepository _repo;

        public AppController(IMailService ManoMailServisas, IDataRepository repo)
        {
            _manoMailServisas = ManoMailServisas;
            _repo = repo;
        }

        public IActionResult Index()
        
        {
            
            return View();
        }
        [HttpGet("contact")]
        public IActionResult Contact()
        
        {
           // throw new InvalidProgramException("klaida arba exeption");
             return View();
        }
        [HttpPost("contact")]
        public IActionResult Contact(ContactViewModel  ContactOobjektas)
        
        {
            if (ModelState.IsValid)
            {
                _manoMailServisas.SendMessage("mano@mmailas.lt", ContactOobjektas.Subject, ContactOobjektas.Message);
                ViewBag.UserMessage = "Mail sent!";
                ModelState.Clear(); 
            }
            else
            { //show errors}
            }
            return View();
        }
        public IActionResult About()
        
        {
           //throw new InvalidProgramException("klaida arba exeption");
            return View();
        }
        //[Authorize] nuimu, palieku checkoutinant su authActivator per Angular
        
        public IActionResult Shop()
        {
            var results = _repo.GetAllProducts();
            return View(results.ToList());
        }
        public IActionResult Login()
        {
           
            return View();
        }
    }
}
