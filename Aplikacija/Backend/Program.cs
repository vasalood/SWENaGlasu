using Microsoft.EntityFrameworkCore;
using Business.Contexts;
using Services.Abs;
using Services.Impl;
using Domain.IRepo;
using Business.Repo;
using Newtonsoft;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddScoped<IKategorijaRepo, KategorijaRepoImpl>();
builder.Services.AddScoped<IOglasRepo, OglasRepoImpl>();

builder.Services.AddScoped<IOglasService, OglasService>();
builder.Services.AddScoped<IKategorijaService, KategorijaService>();

builder.Services.AddScoped<IKorisnikRepo, KorisnikRepoImpl>();
builder.Services.AddScoped<IKorisnikService, KorisnikService>();

builder.Services.AddScoped<IUgovorRepo, UgovorRepoImpl>();
builder.Services.AddScoped<IUgovorService, UgovorService>();

builder.Services.AddScoped<IOcenaRepo, OcenaRepoImpl>();
builder.Services.AddScoped<IOcenaService, OcenaService>();


builder.Services.AddDbContext<NaGlasuContext>(options=>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("NaGlasuDB"));
    options.EnableSensitiveDataLogging();
});

builder.Services.AddCors(
options=>
{
    options.AddPolicy("CORS",policy=>
    {
        policy.WithOrigins(     
        "https://localhost:8080",
        "http://localhost:8080",
        "https://127.0.0.1:8080",
        "https://127.0.0.1:8080").AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseCors("CORS");

app.UseAuthorization();

app.MapControllers();

app.Run();
