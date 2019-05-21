using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Arduino.Configuration;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Arduino
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(ConfigureApp)
                .UseStartup<Startup>();

        private static void ConfigureApp(WebHostBuilderContext context, IConfigurationBuilder builder)
        {
            builder.AddDevAppSettings(context.HostingEnvironment);
        }
    }
}
