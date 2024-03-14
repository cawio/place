using Place.Data;

namespace Place.WebApi.Services;

public static class PlaceServices
{
    public static IServiceCollection AddPlaceServices(this IServiceCollection services)
    {
        #region Place DbContext
        services.AddDbContext<IPlaceDbContext, PlaceDbContext>();
        #endregion

        #region Place Scoped Services
        services.AddScoped<ITilesService, TilesService>();
        #endregion

        #region Place Transient Services
        #endregion

        #region Place Singleton Services
        #endregion

        return services;
    }
}
