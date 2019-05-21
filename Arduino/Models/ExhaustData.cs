using Arduino.Models.Entries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Models
{
    public class ExhaustData
    {
        public List<ExhaustEntry> Entries { get; set; } = new List<ExhaustEntry>();
    }
}
