REM Set the parameters
set DB_NAME=%1

mongosh %DB_NAME% --eval "db.getCollectionNames().forEach(function(c) { db[c].deleteMany({}); })"