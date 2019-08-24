using System;

namespace Arduino.Business
{
    public class ParsedEntry
    {
        public DateTime Timestamp { get; set; }
        public string DisplayName { get; set; }
        public double Value { get; set; }
    }
}
