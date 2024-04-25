FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY .npmrc* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile --non-interactive; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY . .
RUN yarn build
FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && chown -R nextjs:nodejs /app

USER nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

# Переменные окружения
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME localhost

# Запуск сервера Next.js
CMD ["yarn", "start"]