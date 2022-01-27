@echo off
rem 起動時はexeフォルダにいるため、batフォルダまで移動
cd src\bat
set CURRENT_PATH=%~dp0

rem 最新のbkファイル名を取得
set trimDate=%DATE: =0%
set timestamp=_%trimDate:~0,4%_%trimDate:~5,2%_%trimDate:~8,2%
set GIFT=C:\Users\%USERNAME%\Documents\Gift\
cd /d %GIFT%
dir /a-d /b /o:n | findstr /v "names.txt">names.txt
powershell Get-Content -path names.txt -tail 1 >latest_name.txt
set LATEST_NAME= && set /p LATEST_NAME=<latest_name.txt
del /q %GIFT%names.txt
del /q %GIFT%latest_name.txt

rem timestampとverを取得
echo %LATEST_NAME%| findstr /r "^.*%timestamp%_ver.*\.zip$" > nul
if not errorlevel 1 set VERSION=%LATEST_NAME:~19,-4%

rem 新bkフォルダを作成
set /a NEW_VER=%VERSION%+1
set GIFT_NAME=C:\Users\%USERNAME%\Documents\Gift\Gift%timestamp%_ver%NEW_VER%
mkdir %GIFT_NAME%

rem 対象フォルダ名を出力する(上書き)
echo Gift%timestamp%_ver%NEW_VER%>%CURRENT_PATH%\name.txt
exit