using GameLib;
using Microsoft.AspNetCore.Mvc;
using WasmApp.Components;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<GameJsInterop>();

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveWebAssemblyComponents();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseAntiforgery();

app.UseStaticFiles();
app.MapRazorComponents<App>()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(GameLib.GameJsInterop).Assembly)
    .AddAdditionalAssemblies(typeof(WasmApp.Client.Routes).Assembly);

//app.MapGet("/_content/GameLib/sounds/{name}", ([FromServices] GameResources resources, string name) =>
//{
//    return Results.Bytes(resources.Sounds(name));
//})
//.AllowAnonymous();

app.Run();
