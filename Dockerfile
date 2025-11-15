# Usar nginx como servidor web
FROM nginx:alpine

# Copiar todos os arquivos do projeto para o diretório do nginx
COPY . /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta (Railway usa a variável $PORT)
EXPOSE 80

# Comando para iniciar o nginx
CMD sed -i "s/listen 80/listen $PORT/g" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'