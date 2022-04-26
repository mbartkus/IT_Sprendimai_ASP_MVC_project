using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using IT_Sprendimai.Data.Entities;
using Microsoft.Extensions.Configuration;
using IT_Sprendimai.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace IT_Sprendimai.Data
{
    public class IT_Context : IdentityDbContext<StoreUser>
    {
        private IConfiguration _config;

        public IT_Context(IConfiguration config)
        {
            _config = config;
        }

        public DbSet<Order> OrderDbSet { get; set; }  //quariable endpoint 

        public DbSet<Product> ProductDbSet { get; set; }
        public object Products { get; internal set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(_config["ConnectionStrings:IT_ContextDB"]);
        }
        


        protected override void OnModelCreating(ModelBuilder modelBuilder) 
           {
               base.OnModelCreating(modelBuilder);

               modelBuilder.Entity<Order>()
                   .HasData(new Order()
                   {
                       Id = 1,
                       OrderDate = DateTime.UtcNow,
                       OrderNumber = "12345"
                   }
                   );      


   }        

    }

}
