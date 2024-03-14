using Microsoft.EntityFrameworkCore;

namespace Place.Data;

public interface IPlaceDbContext
{
    DbSet<Tile> Tiles { get; set; }

}
