# build
FROM node:16 AS build

WORKDIR /opt/app

COPY package*.json ./

RUN yarn install

COPY ./ .

ENV PORT=3000

EXPOSE $PORT

RUN yarn build

COPY env.sh .env ./

# production
FROM nginx:1.23-alpine AS production

RUN apk add -u bash

WORKDIR /usr/share/nginx/html

# remove default nginx static assets
RUN rm -rf ./*

EXPOSE 80

RUN set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1 \

USER www-data

COPY --from=build --chown=www-data:www-data /opt/app/dist /opt/app/env.sh /opt/app/.env ./

# inject local environment variables dynamically
RUN sed -i 's|<!-- env-config-here -->|<script src="./static/env-config.js"></script>|g' index.html

CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && mv env-config.js static && nginx -g \"daemon off;\""]
