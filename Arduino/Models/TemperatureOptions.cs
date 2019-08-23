using System.Collections.Generic;

namespace Arduino.Models
{
    public class TemperatureOptions
    {
        public List<ParserOption> Exhaust { get; set; }
        public List<ParserOption> Misc { get; set; }
    }
}
