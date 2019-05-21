using Arduino.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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

        [HttpGet("data/folders")]
        public async Task<IActionResult> GetAllDatesWithDataAsync()
        {
            var folders = await _sensorDataRepository.ListDataFoldersAsync();

            return Ok(folders.OrderByDescending(s => s));
        }

        [HttpGet("data/{folder}/exhaust")]
        public async Task<IActionResult> GetExhaustDataAsync(string folder)
        {
            var data = await _sensorDataRepository.GetExhaustDataAsync(folder);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound("Could not find any exhaust data.");
        }

        [HttpGet("data/{folder}/misc")]
        public async Task<IActionResult> GetMiscDataAsync(string folder)
        {
            var data = await _sensorDataRepository.GetMiscDataAsync(folder);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound("Could not find any misc data.");
        }

        [HttpGet("data/{folder}/pressure")]
        public async Task<IActionResult> GetPressureDataAsync(string folder)
        {
            var data = await _sensorDataRepository.GetPressureDataAsync(folder);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound("Could not find any pressure data.");
        }
    }
}
