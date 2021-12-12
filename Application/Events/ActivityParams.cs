using System;
using Application.Events.Core;

namespace Application.Events
{
    public class ActivityParams : PagingParams
    {
        public bool IsGoing { get; set; }
        public bool IsHost { get; set; }
        public string Category { get; set;}
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}