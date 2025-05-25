#======================================================================================#
# Frontend builder
#======================================================================================#
FROM node:22-bookworm-slim AS frontend

WORKDIR /build

COPY package.json yarn.lock .
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
