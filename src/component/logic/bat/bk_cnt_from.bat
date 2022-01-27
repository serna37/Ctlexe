@echo off
cd /d C:\Users\%USERNAME%\Documents\World\
rem ファイル/フォルダ数カウント
dir /S /B | find /c /v ""
exit