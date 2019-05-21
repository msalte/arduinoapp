using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Controllers
{
    public class AppController : Controller
    {
        [HttpGet("/")]
        [HttpGet("/{*anything}")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
