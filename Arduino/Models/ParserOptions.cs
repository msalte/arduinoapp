using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Models
{
    public class ParserOptions
    {
        public TemperatureOptions Temperature { get; set; }
        public List<ParserOption> Pressure { get; set; }
    }
}
