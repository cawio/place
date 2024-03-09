using Place.Data;

namespace Place.WebApi.Endpoints;

public static class TileEndpoints
{
    public static void MapTileEndpoints(this WebApplication app)
    {
        app.MapGet("/api/tiles", GetAllTiles)
            .WithName("GetAllTiles")
            .WithOpenApi();
    }

    private static async Task<IEnumerable<TileDTO>> GetAllTiles()
    {
        var tiles = new List<TileDTO>
        {
            new() { Id = "1", X = 0, Y = 0, Color = "red" },
            new() { Id = "2", X = 1, Y = 0, Color = "blue" },
            new() { Id = "3", X = 0, Y = 1, Color = "green" },
            new() { Id = "4", X = 1, Y = 1, Color = "yellow" },
            new() { Id = "5", X = 0, Y = 2, Color = "purple" },
            new() { Id = "6", X = 1, Y = 2, Color = "orange" }
        };

        return await Task.FromResult(tiles);
    }
}
