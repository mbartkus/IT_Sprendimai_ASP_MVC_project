using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using IT_Sprendimai.Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;




namespace IT_Sprendimai
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var host = BuildWebHost(args);
            RunSeeding(host);
            /*    if (args.Length == 1 && args[0].ToLower() == "/seed"){
                //    RunSeeding(host);
                }
               else {

           */
            host.Run();
                      
        }
        private static void RunSeeding(IWebHost host)
        {
            var scopeFactory = host.Services.GetService<IServiceScopeFactory>();//a way outside of web server to create a scoped 
            using var scope = scopeFactory.CreateScope();
            SeederClass seeder = scope.ServiceProvider.GetService<SeederClass>(); //GetService creates instance and tries to fullfil;l all dependancies 
            seeder.SeedAsync().Wait(); //and the <seederClass> has a scoped dependancy
        }
            public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration(MyNewAppConfiguration).UseStartup<Startup>().Build();

        private static void MyNewAppConfiguration(WebHostBuilderContext _context, IConfigurationBuilder _builder)
        {
            _builder.Sources.Clear();
            _builder.SetBasePath(Directory.GetCurrentDirectory())

                .AddJsonFile("config.json")
                .AddEnvironmentVariables();            
        }
    }
}
