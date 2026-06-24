#======================================================================================#
# Frontend builder
#======================================================================================#
FROM node:26-trixie AS frontend

WORKDIR /build

RUN npm install -g corepack && corepack enable

COPY .yarnrc.yml package.json yarn.lock .
COPY .yarn ./.yarn
RUN --mount=type=cache,target=/root/.cache/yarn \
    YARN_CACHE_FOLDER=/root/.cache/yarn yarn install

COPY . .
RUN --mount=type=cache,target=/root/.cache/yarn \
    YARN_CACHE_FOLDER=/root/.cache/yarn yarn build

#======================================================================================#
# Production image
#======================================================================================#
FROM nginx:1.27-bookworm AS mariners-eye

COPY --from=frontend /build/dist /usr/share/nginx/html
