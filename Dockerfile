# ─── Stage 1: Build ───────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

# Variables de build (pueden sobreescribirse con --build-arg)
ARG VITE_APP_NAME=Ednitha
ARG VITE_CLOUDINARY_PLACEHOLDER_URL=https://res.cloudinary.com/my-projects-cloudinary/image/upload/v1779735683/Ednitha/muneca-trapo_hq9p3g.jpg

ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_CLOUDINARY_PLACEHOLDER_URL=$VITE_CLOUDINARY_PLACEHOLDER_URL

RUN npm run build

# ─── Stage 2: Production (Nginx) ──────────────────────────────
FROM nginx:1.27-alpine AS production

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
