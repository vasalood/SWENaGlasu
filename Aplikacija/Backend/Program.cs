using Microsoft.EntityFrameworkCore;
using Business.Contexts;
using Services.Abs;
using Services.Impl;
using Domain.IRepo;
using Business.Repo;
using Newtonsoft;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Models;
using UserManagementService;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Auth API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

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
    options.UseSqlServer(builder.Configuration.GetConnectionString("ProjekatCS"));
    options.EnableSensitiveDataLogging();
});
builder.Services.AddIdentity<Korisnik, IdentityRole>()
        .AddEntityFrameworkStores<NaGlasuContext>()
        .AddDefaultTokenProviders();

//Add Config for Required Email
builder.Services.Configure<IdentityOptions>(opts=>opts.SignIn.RequireConfirmedEmail=true);
builder.Services.Configure<DataProtectionTokenProviderOptions>(opts=>opts.TokenLifespan=TimeSpan.FromHours(10));
        //Adding Authentication
builder.Services.AddAuthentication(options=>{
    options.DefaultAuthenticateScheme=JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme=JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme=JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});
//Add Email Configs
var emailConfig = builder.Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);
builder.Services.AddScoped<IEmailService, EmailService>();
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

//Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
 app.UseHttpsRedirection();

app.UseCors("CORS");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
