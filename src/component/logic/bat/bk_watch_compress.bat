@echo off
set WATCH_TARGET=C:\Users\%USERNAME%\Documents\Gift\%1
if exist %WATCH_TARGET% (
 echo notyet
) else (
 echo complete
)