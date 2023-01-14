using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<DbTheaterLaakContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DbTheaterLaakContext") ?? throw new InvalidOperationException("Connection string 'DbBoekingContext' not found.")));

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                      });
});

// Add services to the container.

builder.Services.AddCors(o => o.AddPolicy(MyAllowSpecificOrigins, builder =>
{
    builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

<<<<<<< HEAD
app.Run();
=======
app.Run();
>>>>>>> ffbcf60ba9f166985ed2f6b5f047cd4b5264447e
