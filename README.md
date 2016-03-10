## pizzaSync
这是一个基于nw.js构建的文件同步工具（单项），支持本地目录和SFTP协议，暂未添加FTP协议支持。目前主要用于代码文件实时更新至linux测试机上，完成windows开发linux运行调试的同步环节。

		本程序已经安全运行两年，除了用户界面很low外，暂未发现bug。本程序将会在本人空闲时按照升级路线逐步完善

## 功能
1. 实时本地文件不同目录同步，支持add file/directory、 update file、 rm file/directory
2. 实时本地文件同步至测试机(SFTP协议)，支持add file/directory、 update file、 rm file/directory
3. 支持文件忽略，可以匹配正则

## 使用

下载nw.js v0.12.3版本，解压到本目录，然后双击nw.exe运行，由于界面很low，如使用可以联系作者(huabinglan@163.com),sorry.

##性能测试

> 文件数 836个
> 
> 文件大小 22K
> 
> 执行时间 85s
> 
> 平均 9.8个/s


## 路线图
1. 完善可视化操作流程
2. 配置导入导出
3. 添加FTP协议支持
4. 支持定时同步备份
5. 支持rar/zip压缩

