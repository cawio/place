using Microsoft.EntityFrameworkCore;

namespace Place.Data;

public class PlaceDbContext(DbContextOptions<PlaceDbContext> options) : DbContext(options), IPlaceDbContext
{
    public DbSet<Tile> Tiles { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=place.db");
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tile>().HasData(SeedTiles(1_000_000));
    }

    private static List<Tile> SeedTiles(int count)
    {
        var tiles = new List<Tile>();
        for (var i = 0; i < count; i++)
        {
            tiles.Add(new Tile
            {
                Id = i,
                X = i % 1000,
                Y = i / 1000,
                Color = "#FFF",
                LastModified = DateTime.UtcNow
            });
        }
        return tiles;
    }
}
