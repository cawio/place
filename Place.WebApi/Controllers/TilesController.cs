using Microsoft.AspNetCore.Mvc;
using Place.Data;
using Place.WebApi.Services;

namespace Place.WebApi.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class TilesController(ITilesService tilesService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(List<TileDTO>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<TileDTO>>> GetTiles([FromQuery] IEnumerable<int>? ids)
    {
        var tiles = await tilesService.GetTilesAsync(ids);
        var dtos = tiles.Select(t => new TileDTO(){Id = t.Id.ToString(), X = t.X, Y = t.Y, Color = t.Color, LastModified = t.LastModified}).ToList();
        return Ok(tiles);
    }
}
