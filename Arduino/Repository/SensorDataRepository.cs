using Arduino.Business;
using Arduino.Models;
using Arduino.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Repository
{
    public interface ISensorDataRepository
    {
        Task<ExhaustData> GetExhaustDataAsync(string tractor, string segment);
        Task<PressureData> GetPressureDataAsync(string tractor, string segment);
        Task<MiscData> GetMiscDataAsync(string tractor, string segment);
        Task<List<string>> ListFolder(string parent);
        Task<string> GenerateSharedAccessSignature();
    }

    public class SensorDataRepository : ISensorDataRepository
    {
        private const string BLOB_NAME_EXHAUST = "EXHAUST.TXT";
        private const string BLOB_NAME_MISC = "MISC.TXT";
        private const string BLOB_NAME_PRESSURE = "PRESSURE.TXT";

        private const string BLOB_CONTAINER_NAME = "sensordata";

        private readonly IBlobStorageClient _blobStorageClient;

        public SensorDataRepository(IBlobStorageClient blobStorageClient)
        {
            _blobStorageClient = blobStorageClient;
        }

        public async Task<string> GenerateSharedAccessSignature()
        {
            return await _blobStorageClient.GenerateSASForContainer(BLOB_CONTAINER_NAME);
        }

        public async Task<ExhaustData> GetExhaustDataAsync(string tractor, string segment)
        {
            var path = $"{tractor}/data/{segment}/{BLOB_NAME_EXHAUST}";

            var text = await _blobStorageClient.ReadBlobAsStringAsync(BLOB_CONTAINER_NAME, path);

            if (text == null)
            {
                return null;
            }

            var lines = text.Split(new[] { Environment.NewLine }, StringSplitOptions.None);

            return SensorDataParser.Exhaust.Parse(lines);
        }

        public async Task<MiscData> GetMiscDataAsync(string tractor, string segment)
        {
            var path = $"{tractor}/data/{segment}/{BLOB_NAME_MISC}";

            var text = await _blobStorageClient.ReadBlobAsStringAsync(BLOB_CONTAINER_NAME, path);

            if (text == null)
            {
                return null;
            }

            var lines = text.Split(new[] { Environment.NewLine }, StringSplitOptions.None);

            return SensorDataParser.Misc.Parse(lines);
        }

        public async Task<PressureData> GetPressureDataAsync(string tractor, string segment)
        {
            var path = $"{tractor}/data/{segment}/{BLOB_NAME_PRESSURE}";

            var text = await _blobStorageClient.ReadBlobAsStringAsync(BLOB_CONTAINER_NAME, path);

            if (text == null)
            {
                return null;
            }

            var lines = text.Split(new[] { Environment.NewLine }, StringSplitOptions.None);

            return SensorDataParser.Pressure.Parse(lines);
        }

        public async Task<List<string>> ListFolder(string path)
        {
            var uris = await _blobStorageClient.ListFolder(BLOB_CONTAINER_NAME, path);

            var folderNames = uris.Select(i => i.Segments.Last().Replace("/", "")).ToList();

            return folderNames;
        }
    }
}
