@echo off
if not exist "package.json" (
 echo Can't find package.json, run bat in project's directory.
 exit /B
)
if exist "build" (
 echo Delete old files.
 del /q build\*.* 
 rd build
)
echo Compressing...
7z a -tzip my-app.nw * -xr!?git\* -mx0
echo Copy dependent files.
copy d:\node-webkit\nw.pak nw.pak
copy d:\node-webkit\icudtl.dat icudtl.dat
echo Create build directory.
mkdir build
echo Building...
copy /b d:\node-webkit\nw.exe+my-app.nw build\my-app.exe
copy nw.pak build\nw.pak
copy icudtl.dat build\icudtl.dat
echo Delete files.
del nw.pak
del icudtl.dat
del my-app.nw
echo Everything is ok.
pause