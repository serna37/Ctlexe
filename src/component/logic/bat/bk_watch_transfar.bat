@echo off
if not exist D:\bk (
 echo complete
)
set WATCH_TARGET=D:\bk\%1.zip
if exist %WATCH_TARGET% (
 echo complete
) else (
 echo notyet
)