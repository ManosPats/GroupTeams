using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using GroupTeams.Data;
using Microsoft.AspNetCore.Mvc.Formatters;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.Net.Http.Headers;

namespace GroupTeams
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("RemoteDB") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContext' not found.")));

            // Add services to the container.
            builder.Services.AddRazorPages();
            builder.Services.AddControllers(
                //options =>
            //{
            //    options.OutputFormatters.RemoveType<SystemTextJsonOutputFormatter>();
            //    options.OutputFormatters.Add(
            //        new SystemTextJsonOutputFormatter(
            //            new JsonSerializerOptions(JsonSerializerDefaults.Web)
            //            {
            //                //MaxDepth = 1,
            //                ReferenceHandler = ReferenceHandler.Preserve,
            //            })
            //    );
            //});
            );
            builder.Services.AddCors(
                options => options.AddPolicy("FrontEndPolicy",
                policy => policy.AllowAnyOrigin().AllowAnyHeader()
                )); //.WithHeaders((HeaderNames.ContentType, "application/json")));


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors("FrontEndPolicy");

            app.UseAuthorization();
            app.MapControllers();

            app.MapRazorPages();

            app.Run();
        }
    }
}