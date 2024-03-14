# place

# adding a migration

```pwsh
cd ./Place.Data
dotnet ef migrations add <MigrationName> -s ../Place.WebApi
```

# updating the database

```pwsh
cd ./Place.Data
dotnet ef database update -s ../Place.WebApi
```