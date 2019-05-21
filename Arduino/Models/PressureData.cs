using Arduino.Models.Entries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Models
{
    public class PressureData
    {
        public List<PressureEntry> Entries { get; set; } = new List<PressureEntry>();
    }
}
