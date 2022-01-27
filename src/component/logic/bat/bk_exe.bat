@echo off
set BK_FROM=C:\Users\%USERNAME%\Documents\World\
set BK_TO=C:\Users\%USERNAME%\Documents\Gift\%1
robocopy /s /e %BK_FROM% %BK_TO%
powershell Compress-Archive -Path %BK_TO% -DestinationPath %BK_TO%.zip -Force
rem src\lib\7za920\7za.exe a %BK_TO%.zip %BK_FROM%
rmdir /s /q %BK_TO%
rem 存在する場合実行, ない場合ムービーごとキャンセルしたいのであとでなおす
if exist D:\bk (
 powershell sleep 3
 copy /y %BK_TO%.zip D:\bk
)
exit
