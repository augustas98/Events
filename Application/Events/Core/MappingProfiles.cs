using System.Linq;
using Application.Events.DataTransferObjects;
using AutoMapper;
using Domain;

namespace Application.Events.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUserName, o => o
                .MapFrom(s => s.Attendees
                .FirstOrDefault(x => x.IsHost).Appuser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Appuser.DisplayName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Appuser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.Appuser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Appuser.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}