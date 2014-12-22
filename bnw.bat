@echo off
if not exist "package.json" (
 echo 无法找到package.json文件，请在项目根目录下执行。
 exit /B
)
echo 正在压缩文件
7z a -tzip my-app.nw * -xr!?git\* -mx0
echo 复制依赖文件
copy d:\node-webkit\nw.pak nw.pak
copy d:\node-webkit\icudtl.dat icudtl.dat
echo 创建build目录
mkdir build
echo 生成exe
copy /b d:\node-webkit\nw.exe+my-app.nw build\my-app.exe
echo 打包依赖文件
copy nw.pak build\nw.pak
copy icudtl.dat build\icudtl.dat
echo 删除临时文件
del nw.pak
del icudtl.dat
del my-app.nw
echo 编译完成。