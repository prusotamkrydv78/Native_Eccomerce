using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using WebApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<NativeDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("NativeEcommerceConnectionString")));

 
var app = builder.Build();

app.MapOpenApi();

app.MapScalarApiReference();

app.MapControllers();

app.Run();