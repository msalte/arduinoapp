using Arduino.Business;
using Arduino.Models;
using Arduino.Storage;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Repository
{
    public interface ISensorDataRepository
    {
        Task<IList<ParsedEntry>> GetExhaustDataAsync(string tractor, string segment);
        Task<IList<ParsedEntry>> GetPressureDataAsync(string tractor, string segment);
        Task<IList<ParsedEntry>> GetMiscDataAsync(string tractor, string segment);
        Task<List<string>> ListFolder(string parent);
        Task<string> GenerateSharedAccessSignature();
    }

    public class SensorDataRepository : ISensorDataRepository
    {
        private const string BLOB_NAME_EXHAUST = "EXHAUST.TXT";
        private const string BLOB_NAME_MISC = "MISC.TXT";
        private const string BLOB_NAME_PRESSURE = "PRESSURE.TXT";

        private const string BLOB_CONTAINER_NAME = "sensordata";

        private readonly IBlobStorageClient blobStorageClient;

        private static ConcurrentDictionary<string, ParserOptions> _parserOptions = new ConcurrentDictionary<string, ParserOptions>();
        private readonly IDataParser dataParser;

        public SensorDataRepository(IBlobStorageClient blobStorageClient, IDataParser dataParser)
        {
            this.blobStorageClient = blobStorageClient;
            this.dataParser = dataParser;
        }

        public async Task<string> GenerateSharedAccessSignature()
        {
            return await blobStorageClient.GenerateSASForContainer(BLOB_CONTAINER_NAME);
        }

        private async Task<ParserOptions> GetParserOptions(string tractor)
        {
            var path = $"{tractor}/options.json";

            if (_parserOptions.TryGetValue(path, out ParserOptions opts))
            {
                return opts;
            }

            var optionsStr = await blobStorageClient.ReadBlobAsStringAsync(BLOB_CONTAINER_NAME, path);
            var options = JsonConvert.DeserializeObject<ParserOptions>(optionsStr);

            _parserOptions.TryAdd(path, options);

            return options;
        }

        public async Task<IList<ParsedEntry>> GetExhaustDataAsync(string tractor, string segment)
        {
            var path = $"{tractor}/data/{segment}/{BLOB_NAME_EXHAUST}";

            var text = await blobStorageClient.ReadBlobAsStringAsync(BLOB_CONTAINER_NAME, path);

            if (text == null)
            {
                return null;
            }

            var options = await GetParserOptions(tractor);
            var lines = text.Split(new[] { Environment.NewLine }, StringSplitOptions.None);

            return dataParser.ParseFile(lines, options.Temperature.Exhaust);
        }

        public async Task<IList<ParsedEntry>> GetMiscDataAsync(string tractor, string segment)
        {
            var path = $"{tractor}/data/{segment}/{BLOB_NAME_MISC}";

            var text = await blobStorageClient.ReadBlobAsStringAsync(BLOB_CONTAINER_NAME, path);

            if (text == null)
            {
                return null;
            }

            var options = await GetParserOptions(tractor);
            var lines = text.Split(new[] { Environment.NewLine }, StringSplitOptions.None);

            return dataParser.ParseFile(lines, options.Temperature.Misc);
        }

        public async Task<IList<ParsedEntry>> GetPressureDataAsync(string tractor, string segment)
        {
            var path = $"{tractor}/data/{segment}/{BLOB_NAME_PRESSURE}";

            var text = await blobStorageClient.ReadBlobAsStringAsync(BLOB_CONTAINER_NAME, path);

            if (text == null)
            {
                return null;
            }

            var options = await GetParserOptions(tractor);
            var lines = text.Split(new[] { Environment.NewLine }, StringSplitOptions.None);

            return dataParser.ParseFile(lines, options.Pressure);
        }

        public async Task<List<string>> ListFolder(string path)
        {
            var uris = await blobStorageClient.ListFolder(BLOB_CONTAINER_NAME, path);

            var folderNames = uris.Select(i => i.Segments.Last().Replace("/", "")).ToList();

            return folderNames;
        }
    }
}
