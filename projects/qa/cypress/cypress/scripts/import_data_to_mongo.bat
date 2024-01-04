setlocal

REM Set the parameters
set DB_NAME=%1
set COLLECTION_NAME=%2
set JSON_FILE_PATH=%3

echo %DB_NAME%
echo %COLLECTION_NAME%
echo %JSON_FILE_PATH%

REM Check if JSON file exists
if not exist "%JSON_FILE_PATH%" (
    echo Error: JSON file not found at "%JSON_FILE_PATH%"
    exit /b 1
)

REM Import command
mongoimport --host 0.0.0.0 --port 27017 --db %DB_NAME% --collection %COLLECTION_NAME% --file "%JSON_FILE_PATH%" --jsonArray
endlocal