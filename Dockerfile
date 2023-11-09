FROM node:14-alpine AS base
USER root
ENV NPM_CONFIG_PREFIX=/app/.npm-global
ENV HOME=/app
RUN apk --no-cache add bash git vim
RUN mkdir .npm-global
WORKDIR /app
COPY package*.json ./
RUN npm install --only=prod

FROM base AS production
ENV DATA_DIR ${DATA_DIR:-/app/data}
WORKDIR /app
COPY apidoc apidoc
COPY lib lib
COPY etc etc
COPY dockerize dockerize
COPY app.js ./
COPY --from=base /app/node_modules node_modules
ENTRYPOINT []
CMD ["npm", "start"]

FROM production AS test
WORKDIR /app
COPY --from=production /app/. .
COPY --from=base /app/package*.json ./
COPY .eslintrc .eslintrc
RUN npm install --only=dev
ENTRYPOINT []
