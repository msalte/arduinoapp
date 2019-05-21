using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Configuration
{
    public static class ConfigurationBuilderExtensions
    {
        public static IConfigurationBuilder AddDevAppSettings(this IConfigurationBuilder builder, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                var jsonFile = Path.Combine(env.ContentRootPath, $"..\\Development\\appsettings.{Environment.MachineName}.json");
                builder.AddJsonFile(jsonFile, true);
            }

            return builder;
        }
    }
}
