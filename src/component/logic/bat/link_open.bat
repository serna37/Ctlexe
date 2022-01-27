@echo off
cd /d C:\Users\%USERNAME%\Documents\World\link\%1
for %%a in (*.*) do (start "" "%%a")
exit
