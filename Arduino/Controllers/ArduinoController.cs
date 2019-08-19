using Arduino.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Arduino.Controllers
{
    public class SensorDataController : Controller
    {
        private readonly ISensorDataRepository _sensorDataRepository;

        public SensorDataController(ISensorDataRepository sensorDataRepository)
        {
            _sensorDataRepository = sensorDataRepository;
        }

        //[Authorize]
        //[HttpGet("sas/upload")]
        //public async Task<IActionResult> GetSharedAccessSignatureForUpload()
        //{
        //    var sas = await _sensorDataRepository.GenerateSharedAccessSignature();

        //    return Ok(sas);
        //}

        [HttpGet("tractors")]
        public async Task<IActionResult> GetAllTractors()
        {
            var folders = await _sensorDataRepository.ListFolder(string.Empty);
            return Ok(folders.OrderByDescending(s => s));
        }

        [HttpGet("tractors/{tractor}/segments")]
        public async Task<IActionResult> GetSegmentsForTractor(string tractor)
        {
            var path = $"{tractor}/data";
            var folders = await _sensorDataRepository.ListFolder(path);
            return Ok(folders.OrderByDescending(s => s));
        }

        [HttpGet("tractors/{tractor}/segments/{segment}/exhaust")]
        public async Task<IActionResult> GetExhaustDataAsync(string tractor, string segment)
        {
            var data = await _sensorDataRepository.GetExhaustDataAsync(tractor, segment);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound("Could not find any exhaust data.");
        }

        [HttpGet("tractors/{tractor}/segments/{segment}/misc")]
        public async Task<IActionResult> GetMiscDataAsync(string tractor, string segment)
        {
            var data = await _sensorDataRepository.GetMiscDataAsync(tractor, segment);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound("Could not find any misc data.");
        }

        [HttpGet("tractors/{tractor}/segments/{segment}/pressure")]
        public async Task<IActionResult> GetPressureDataAsync(string tractor, string segment)
        {
            var data = await _sensorDataRepository.GetPressureDataAsync(tractor, segment);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound("Could not find any pressure data.");
        }
    }
}
