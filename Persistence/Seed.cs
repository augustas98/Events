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

                await context.SaveChangesAsync();
            }
        }
    }
}
