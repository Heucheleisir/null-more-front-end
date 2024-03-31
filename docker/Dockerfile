# 使用 Nginx 镜像作为基础镜像
FROM nginx:latest

# 复制构建的 Vue 应用到 Nginx 静态文件目录
ADD ./dist/ /usr/share/nginx/html/
ADD ./nginx.conf /etc/nginx/nginx.conf

# 暴露 Nginx 默认端口
EXPOSE 80