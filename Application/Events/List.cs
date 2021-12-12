using MediatR;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Application.Core;
using Application.Events.DataTransferObjects;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Events.Core;
using System.Linq;
using Application.Interfaces;
using System.Collections.Generic;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ActivityDto>>> 
        {
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(IUserAccessor userAccessor, DataContext context, IMapper mapper)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Activities
                .Where(a => a.Date >= request.Params.StartDate)
                .OrderBy(d => d.Date)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

                if (request.Params.IsGoing && !request.Params.IsHost)
                {
                    query = query.Where(x => x.Attendees.Any(a => a.Username == _userAccessor.GetUserName()));
                }

                if (request.Params.IsHost && !request.Params.IsGoing)
                {
                    query = query.Where(x => x.HostUsername == _userAccessor.GetUserName());
                }

                if (!string.IsNullOrWhiteSpace(request.Params.Category))
                {
                    query = query.Where(x => x.Category == request.Params.Category);
                }

                return Result<PagedList<ActivityDto>>
                    .Success(await PagedList<ActivityDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}