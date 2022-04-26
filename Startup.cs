using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using IT_Sprendimai.Data;
using IT_Sprendimai.Data.Entities;
using IT_Sprendimai.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace IT_Sprendimai
{
    public class Startup    
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;
        }



        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentity<StoreUser, IdentityRole>(cfg =>
                cfg.User.RequireUniqueEmail = true
                ).AddEntityFrameworkStores<IT_Context>();
            ;
            services.AddControllersWithViews()
                 .AddRazorRuntimeCompilation()
            .AddNewtonsoftJson(cfg=>cfg.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore  );

           services.AddDbContext<IT_Context> (cfg => {cfg.UseSqlServer();} ); 

            services.AddRazorPages();
            services.AddTransient<IMailService, NullMailService>();
            services.AddTransient<SeederClass>();
            services.AddScoped<IDataRepository, DataRepository>();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddAuthentication()
        .AddCookie()
        .AddJwtBearer(cfg =>
        {
          cfg.TokenValidationParameters = new TokenValidationParameters()
          {
            ValidIssuer = _config["Tokens:Issuer"],
            ValidAudience = _config["Tokens:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]))
          };

        });
       //  services.AddIdentityCore<StoreUser>();
        }
    
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //app.UseDefaultFiles();
          if (env.IsDevelopment())
            {
              // app.UseExceptionHandler("/error");
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
            }
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseNodeModules();
            app.UseEndpoints(cfg =>
            {
                cfg.MapRazorPages();
                cfg.MapControllerRoute("Default", 
                    "/{controller}/{action}/{id?}", //tellign the pattern of routing, ?-means optional 
                    new { controller = "App", Action = "Index" });                // telling default action if controller not specified

            });


            /**
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hello World!");
                });
            });
            **/
        }
    }
}
