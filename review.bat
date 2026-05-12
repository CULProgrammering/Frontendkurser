@echo off
setlocal

REM Regenerate the review HTMLs from the current lesson + doc source,
REM then open the lessons file in the default browser.
REM Use the in-page Docs/Lessons pill to switch to the docs view.

cd /d "%~dp0app"
call npx tsx scripts/generate-review.ts
set GENERR=%ERRORLEVEL%
cd /d "%~dp0"

if %GENERR% neq 0 (
  echo.
  echo Generator failed with exit code %GENERR%.
  pause
  exit /b %GENERR%
)

start "" "course-review-lessons.html"
endlocal
