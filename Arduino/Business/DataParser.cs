using Arduino.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Business
{
    public interface IDataParser
    {
        List<ParsedEntry> ParseFile(string[] file, List<ParserOption> options);
    }

    public class DataParser : IDataParser
    {
        const int INDEX_TIMESTAMP = 0;
        const string TIMESTAMP_FORMAT = "dd.MM.yyyy HH:mm:ss";

        public List<ParsedEntry> ParseFile(string[] file, List<ParserOption> options)
        {
            var entries = new List<ParsedEntry>();

            foreach (var line in file)
            {
                if (string.IsNullOrEmpty(line))
                    continue;

                var parts = line.Split(",");

                if (parts.Length < 1)
                    continue;

                foreach (var opt in options)
                {
                    var entry = new ParsedEntry
                    {
                        Timestamp = ParseTimestamp(parts[INDEX_TIMESTAMP]),
                        DisplayName = opt.DisplayName,
                        Value = ParseDouble(parts[opt.SensorIndex])
                    };

                    entries.Add(entry);
                }
            }

            return entries;
        }

        private static double ParseDouble(string number)
        {
            if (!double.TryParse(number, NumberStyles.AllowDecimalPoint | NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture, out double @double))
            {
                @double = -1.00;
            }

            return @double;
        }

        private DateTime ParseTimestamp(string timestamp)
        {
            return DateTime.ParseExact(timestamp, TIMESTAMP_FORMAT, CultureInfo.InvariantCulture);
        }
    }
}
