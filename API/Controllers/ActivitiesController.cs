using Microsoft.AspNetCore.Mvc;
using Domain;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using Application.Events;
using Microsoft.AspNetCore.Authorization;
using Application.Events.Core;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities([FromQuery]ActivityParams parameters)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = parameters}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity (Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Activity = activity}));
        }
        
        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")] 
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }
    }
}