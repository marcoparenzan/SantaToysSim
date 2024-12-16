using Microsoft.JSInterop;

namespace GameLib;

public class GameJsInterop : IAsyncDisposable
{
    Lazy<Task<IJSObjectReference>> gameModuleTask;
    string gameId;

    string StaticPath => $"./_content/{nameof(GameLib)}/";

    public GameJsInterop(IJSRuntime jsRuntime)
    {
        gameModuleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
            "import",
            $"{StaticPath}/js/game.js"
        ).AsTask());
    }

    public async Task SetupAsync(string gameId, object objRef, string canvasId, string staticPath = null)
    {
        var module = await gameModuleTask.Value;
        this.gameId = gameId;
        await module.InvokeVoidAsync("setup", gameId, objRef, canvasId, staticPath ?? StaticPath);
    }

    public async ValueTask DisposeAsync()
    {
        if (gameModuleTask.IsValueCreated)
        {
            var module = await gameModuleTask.Value;
            await module.DisposeAsync();
        }
    }

    public async Task StartAsync()
    {
        var module = await gameModuleTask.Value;
        await module.InvokeVoidAsync("start", gameId);
    }
}
