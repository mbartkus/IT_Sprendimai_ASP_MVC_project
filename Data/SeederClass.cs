using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text.Json;
using IT_Sprendimai.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace IT_Sprendimai.Data
{
    public class SeederClass
    {
        private readonly IT_Context _cntx;
        private readonly IWebHostEnvironment _env;
        private readonly UserManager<StoreUser> _userManager;

        public SeederClass(IT_Context cntx, IWebHostEnvironment env, UserManager<StoreUser> userManager )
        {
            _cntx = cntx;
            _env = env;
            _userManager = userManager;
        }
        public async Task SeedAsync()
        {
            _cntx.Database.EnsureCreated();
            StoreUser user = await _userManager.FindByEmailAsync("mbartkus.it@gmail.com");
            if (user == null)
            {
                user = new StoreUser() { FirstName = "Marius", LastName = "admin", Email = "myMail@gmail.com", UserName = "myMail.it@gmail.com" };
                var result = await _userManager.CreateAsync(user, "slaptazodis");
                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create a new user while using the seeder");
                }
            }
            if (!_cntx.ProductDbSet.Any())
            {
                var pathFile = Path.Combine(_env.ContentRootPath, "Data/IT_Sol.json");
                var jsonFile = File.ReadAllText(pathFile);
                var productsSerialized = JsonSerializer.Deserialize<IEnumerable<Product>>(jsonFile);//texta paverciam y type specified, ir (json )nes attitinka struktura serilaized
                _cntx.ProductDbSet.AddRange(productsSerialized);

                var order = _cntx.OrderDbSet.Where(o => o.Id == 1).FirstOrDefault();

                if (order != null)

                {
                    order.User = user;
                    order.Items = new List<OrderItem>() {
                              new OrderItem()
                                     {
                                    Product = productsSerialized.First(),
                                    Quantity =5,
                                    UnitPrice = productsSerialized.First().Price
                                   
                                     }
                               };
                }
                
                _cntx.SaveChanges();

            }
                
        }



    }
}

