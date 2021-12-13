using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "admin",
                        UserName = "admin",
                        Email = "admin@admin.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "password123");
                }

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Test activity",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test",
                        Category = "drinks",
                        City = "Test",
                        Venue = "Test",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                Appuser = users[0],
                                IsHost = true
                            }
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
