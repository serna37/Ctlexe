@echo off
rem �N������exe�t�H���_�ɂ��邽�߁Abat�t�H���_�܂ňړ�
cd src\bat
set CURRENT_PATH=%~dp0

rem �ŐV��bk�t�@�C�������擾
set trimDate=%DATE: =0%
set timestamp=_%trimDate:~0,4%_%trimDate:~5,2%_%trimDate:~8,2%
set GIFT=C:\Users\%USERNAME%\Documents\Gift\
cd /d %GIFT%
dir /a-d /b /o:n | findstr /v "names.txt">names.txt
powershell Get-Content -path names.txt -tail 1 >latest_name.txt
set LATEST_NAME= && set /p LATEST_NAME=<latest_name.txt
del /q %GIFT%names.txt
del /q %GIFT%latest_name.txt

rem timestamp��ver���擾
echo %LATEST_NAME%| findstr /r "^.*%timestamp%_ver.*\.zip$" > nul
if not errorlevel 1 set VERSION=%LATEST_NAME:~19,-4%

rem �Vbk�t�H���_���쐬
set /a NEW_VER=%VERSION%+1
set GIFT_NAME=C:\Users\%USERNAME%\Documents\Gift\Gift%timestamp%_ver%NEW_VER%
mkdir %GIFT_NAME%

rem �Ώۃt�H���_�����o�͂���(�㏑��)
echo Gift%timestamp%_ver%NEW_VER%>%CURRENT_PATH%\name.txt
exit