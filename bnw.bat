@echo off
if not exist "package.json" (
 echo �޷��ҵ�package.json�ļ���������Ŀ��Ŀ¼��ִ�С�
 exit /B
)
echo ����ѹ���ļ�
7z a -tzip my-app.nw * -xr!?git\* -mx0
echo ���������ļ�
copy d:\node-webkit\nw.pak nw.pak
copy d:\node-webkit\icudtl.dat icudtl.dat
echo ����buildĿ¼
mkdir build
echo ����exe
copy /b d:\node-webkit\nw.exe+my-app.nw build\my-app.exe
echo ��������ļ�
copy nw.pak build\nw.pak
copy icudtl.dat build\icudtl.dat
echo ɾ����ʱ�ļ�
del nw.pak
del icudtl.dat
del my-app.nw
echo ������ɡ�