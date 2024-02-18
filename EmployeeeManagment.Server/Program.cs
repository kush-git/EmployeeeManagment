using EmployeeManagement.Service.Helper;
using EmployeeManagement.Service.Interface;
using EmployeeManagement.Service;
using Microsoft.EntityFrameworkCore;
using EmployeeeManagment.Domain.Models;


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped(typeof(IEmployee), typeof(EmployeeService));
builder.Services.AddScoped(typeof(IRole), typeof(RoleService));
builder.Services.Configure<ApplicationSettings>(builder.Configuration.GetSection("ApplicationSettings"));
builder.Services.AddScoped(typeof(ApplicationSettings));
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
        .SetIsOriginAllowed((host) => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
          options.UseSqlServer(builder.Configuration.GetConnectionString("Server=LAPTOP-SI2IRRPL\\SQLEXPRESS;Initial Catalog=EmployeeManagement;Integrated Security=True;Encrypt=False")));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("CorsPolicy");

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
