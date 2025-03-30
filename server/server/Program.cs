using Amazon.Extensions.NETCore.Setup;
using Amazon;
using Amazon.S3;
using Microsoft.EntityFrameworkCore;
using Server.Core.Repositories;
using Server.Core.Services;
using Server.Data;
using Server.Data.Repositories;
using Server.Service;
using Amazon.Runtime;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);
IConfiguration configuration = builder.Configuration;

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOriginsWithCredentials", policy =>
    {
        policy.SetIsOriginAllowed((host) => true)  
              .AllowAnyMethod()  
              .AllowAnyHeader()  
              .AllowCredentials();  
    });
});

// הגדרת ה-DbContext על בסיס ה-Connection String מקובץ ה-appsettings.json
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
var awsSettings = configuration.GetSection("AwsSettings");

var accessKeyId = awsSettings["AccessKeyId"];
var secretAccessKey = awsSettings["SecretAccessKey"];
// הגדרת המפתחות והשירותים של AWS (אם אתה משתמש ב-S3)
builder.Services.AddDefaultAWSOptions(new AWSOptions
{

    Region = RegionEndpoint.USEast1, // כאן תבחר את האזור המתאים לך (כמו USEast1)
    Credentials = new BasicAWSCredentials(accessKeyId, secretAccessKey) // הכנס את המפתחות שלך כאן
});
builder.Services.AddAWSService<IAmazonS3>();

// הוספת ה-Repositories והשירותים שלך
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFileRepository, FileRepository>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IGroupRepository, GroupRepository>();
builder.Services.AddScoped<IGroupService, GroupService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// הגדרת JWT Authentication (אימות באמצעות JWT)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration.GetSection("JwtSettings");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidateAudience = true,
            ValidAudience = jwtSettings["Audience"],
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"])),
            ClockSkew = TimeSpan.Zero,
        };
        });

// הוספת תמיכה ב-Controllers
builder.Services.AddControllers();

// הוספת Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // הוספת תמיכה ב-Authorization ב-Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// סדר השימוש במiddleware
app.UseCors("AllowAllOriginsWithCredentials");
app.UseHttpsRedirection();
app.UseAuthentication();  // ה-Middleware של האימות
app.UseAuthorization();   // ה-Middleware של ההרשאות

app.MapControllers();  // הגדרת ה-controllers

app.Run();
