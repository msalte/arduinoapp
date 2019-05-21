using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Models.Entries
{
    public class MiscEntry : SensorEntry
    {
        public MiscEntry(string timestamp) : base(timestamp, "C")
        {
        }

        public double TemperatureBeforeIntercooler { get; set; }
        public double TemperatureAfterIntercooler { get; set; }
        public double Average => (TemperatureBeforeIntercooler + TemperatureAfterIntercooler) / 2;
    }
}
