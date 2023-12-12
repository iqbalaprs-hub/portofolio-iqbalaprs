setlocal

REM Set the parameters
set COLLECTION_NAME=%1
set JSON_FILE_PATH=%2


REM Import command
mongoimport --host 0.0.0.0 --port 27017 --db twitter-clone-db --collection %COLLECTION_NAME% --file "%JSON_FILE_PATH%" --jsonArray
endlocal