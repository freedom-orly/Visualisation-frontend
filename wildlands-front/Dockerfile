FROM --platform=$BUILDPLATFORM node:22-bullseye-slim as builder 

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@14.2.2

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN ng build -c production --base-href=/wildlands-front/


FROM builder as dev-envs
COPY . .

FROM nginx:1.29.3-alpine
RUN rm -rf /var/www/html/*
COPY --from=builder /project/dist/wildlands-front /var/www/html/wildlands-front
WORKDIR /var/www/html
RUN ls /var/www/html
RUN mv /var/www/html/wildlands-front/browser/* /var/www/html/wildlands-front/
RUN mv /var/www/html/wildlands-front/index.html /var/www/html/index.html
COPY default.conf /etc/nginx/conf.d/default.conf

RUN nginx -t
EXPOSE 80





# RUN <<EOF
# apt-get update
# apt-get install -y --no-install-recommends git
# EOF

# RUN <<EOF
# useradd -s /bin/bash -m vscode
# groupadd docker
# usermod -aG docker vscode
# EOF
# install Docker tools (cli, buildx, compose)
#COPY --from=gloursdocker/docker / /

#CMD ["ng", "serve","-c","production",  "--host", "0.0.0.0"]