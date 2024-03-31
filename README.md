# null-more-front-end
null-more前端项目(Vue3)
## 启动
添加依赖
```
npm install
```
运行命令

```
npm run dev
```
打包命令

```
npm run build
```

docker部署
1. 迁移dist目录与docker文件夹至服务器目录下
2. 创建network网络（null-more-network）
3. 进入迁移根目录
4. 运行docker compose构建命令（docker-compose up --build）