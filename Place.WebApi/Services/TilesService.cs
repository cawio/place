using Microsoft.EntityFrameworkCore;
using Place.Data;

namespace Place.WebApi.Services;

public class TilesService(IPlaceDbContext dbContext) : ITilesService
{
    public async Task<List<Tile>> GetTilesAsync(IEnumerable<int>? ids)
    {
        if (ids == null || !ids.Any())
        {
            return await dbContext.Tiles.ToListAsync();
        }

        return await dbContext.Tiles.Where(t => ids.Contains(t.Id)).ToListAsync();
    }
}
