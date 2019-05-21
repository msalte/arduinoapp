using Arduino.Models;
using Arduino.Models.Entries;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Business
{
    public static class SensorDataParser
    {
        const int INDEX_TIMESTAMP = 0;

        private static double ParseDouble(string number)
        {
            if (!double.TryParse(number, NumberStyles.AllowDecimalPoint | NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture, out double @double))
            {
                @double = -1.00;
            }

            return @double;
        }

        public static class Misc
        {
            const int LINE_LENGTH = 3;

            private static MiscEntry ParseLine(string line)
            {
                var parts = line.Split(",");

                if (parts.Length != LINE_LENGTH)
                {
                    return null;
                }

                var timestamp = parts[INDEX_TIMESTAMP];

                return new MiscEntry(timestamp)
                {
                    TemperatureBeforeIntercooler = ParseDouble(parts[1]),
                    TemperatureAfterIntercooler = ParseDouble(parts[2]),
                };
            }

            public static MiscData Parse(string[] file)
            {
                var data = new MiscData();

                foreach (var line in file)
                {
                    if (string.IsNullOrWhiteSpace(line))
                    {
                        continue;
                    }

                    var entry = ParseLine(line);

                    if (entry != null)
                    {
                        data.Entries.Add(entry);
                    }
                }

                return data;
            }
        }

        public static class Pressure
        {
            const int LINE_LENGTH = 7;

            private static PressureEntry ParseLine(string line)
            {
                var parts = line.Split(",");

                if (parts.Length != LINE_LENGTH)
                {
                    return null;
                }

                var timestamp = parts[INDEX_TIMESTAMP];

                // filePressure.println(getTimestamp() + "," + String(exhaustPressure) + "," + String(turboPressure1) + "," + String(turboPressure2) + "," + String(dieselPressure) + "," + String(waterInjectPressure) + "," + String(oilPressure));
                return new PressureEntry(timestamp)
                {
                    Exhaust = ParseDouble(parts[1]),
                    Turbo1 = ParseDouble(parts[2]),
                    Turbo2 = ParseDouble(parts[3]),
                    Diesel = ParseDouble(parts[4]),
                    WaterInject = ParseDouble(parts[5]),
                    Oil = ParseDouble(parts[6])
                };
            }

            public static PressureData Parse(string[] file)
            {
                var data = new PressureData();

                foreach (var line in file)
                {
                    if (string.IsNullOrWhiteSpace(line))
                    {
                        continue;
                    }

                    var entry = ParseLine(line);

                    if (entry != null)
                    {
                        data.Entries.Add(entry);
                    }
                }

                return data;
            }

        }

        public static class Exhaust
        {
            const int LINE_LENGTH = 7;

            private static ExhaustEntry ParseLine(string line)
            {
                var parts = line.Split(",");

                if (parts.Length != LINE_LENGTH)
                {
                    return null;
                }

                var timestamp = parts[INDEX_TIMESTAMP];

                return new ExhaustEntry(timestamp)
                {
                    Sensor1 = ParseDouble(parts[1]),
                    Sensor2 = ParseDouble(parts[2]),
                    Sensor3 = ParseDouble(parts[3]),
                    Sensor4 = ParseDouble(parts[4]),
                    Sensor5 = ParseDouble(parts[5]),
                    Sensor6 = ParseDouble(parts[6]),
                };

            }

            public static ExhaustData Parse(string[] file)
            {
                var data = new ExhaustData();

                foreach (var line in file)
                {
                    if (string.IsNullOrWhiteSpace(line))
                    {
                        continue;
                    }

                    var entry = ParseLine(line);

                    if (entry != null)
                    {
                        data.Entries.Add(entry);
                    }
                }

                return data;
            }
        }
    }
}
