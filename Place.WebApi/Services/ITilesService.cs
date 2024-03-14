using Place.Data;

namespace Place.WebApi.Services;

public interface ITilesService
{
    public Task<List<Tile>> GetTilesAsync(IEnumerable<int>? ids);
}
