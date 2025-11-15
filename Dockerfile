FROM nginx:alpine

# Copiar arquivos do projeto
COPY . /usr/share/nginx/html

# Gerar config.js baseado nas env do Railway
RUN echo "window.APP_CONFIG = { API_URL: '${API_URL}' };" > /usr/share/nginx/html/config.js

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]