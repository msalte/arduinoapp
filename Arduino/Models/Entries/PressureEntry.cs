using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Models.Entries
{
    public class PressureEntry : SensorEntry
    {
        public PressureEntry(string timestamp) : base(timestamp, "bar")
        {
        }

        public double Exhaust { get; set; }
        public double Turbo1 { get; set; }
        public double Turbo2 { get; set; }
        public double Diesel { get; set; }
        public double WaterInject { get; set; }
        public double Oil { get; set; }

        public double Average => (Exhaust + Turbo1 + Turbo2 + Diesel + WaterInject + Oil) / 6;
    }
}
