@echo off
rem %~n0
powershell -command "(new-object -com 'WScript.Shell').AppActivate('NERAS')" > nul
exit
