using System.Linq;
using Application.Comments;
using Application.Events.DataTransferObjects;
using Application.Profiles.DataTransferObjects;
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
                .ForMember(d => d.HostUsername, o => o
                .MapFrom(s => s.Attendees
                .FirstOrDefault(x => x.IsHost).Appuser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Appuser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Appuser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.Appuser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Appuser.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<Comment, CommentsDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<ActivityAttendee, UserActivityDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Activity.Id))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Activity.Date))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Activity.Title))
                .ForMember(d => d.Category, o => o.MapFrom(s =>
                s.Activity.Category))
                .ForMember(d => d.HostUsername, o => o.MapFrom(s =>
                s.Activity.Attendees.FirstOrDefault(x =>
                x.IsHost).Appuser.UserName));
        }
    }
}