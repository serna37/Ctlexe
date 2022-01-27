@echo off
cd /d C:\Users\%USERNAME%\Documents\Gift\%1
rem ファイル/フォルダ数カウント
dir /S /B | find /c /v ""
exit