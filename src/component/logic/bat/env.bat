@echo off
set THE_ROOT_DOCUMENT=C:\Users\%USERNAME%\Documents\
set WORLD=%THE_ROOT_DOCUMENT%World\
set GIFT=%THE_ROOT_DOCUMENT%Gift\
set TOOLBOX=%THE_ROOT_DOCUMENT%Tool\
set LINK=%WORLD%link\
set GIFT_TO=%Gift%Gift
set WWORK=%WORLD%work\
set LOG=[INFO] CREATE DIRECTORY:
if not exist %LINK% mkdir %LINK% && echo %LOG%%LINK%
if not exist %WWORK% mkdir %WWORK% && echo %LOG%%WWORK%
if not exist %GIFT% mkdir %GIFT% && echo %LOG%%GIFT%
if not exist %TOOLBOX% mkdir %TOOLBOX% && echo %LOG%%TOOLBOX%
exit
