# start of deps image
FROM node:18-alpine3.18 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm install
# end ofdeps image

# start of container handling the build
FROM node:18-alpine3.18 AS build_image
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN rm -rf node_modules
RUN npm install --production --ignore-scripts --prefer-offline
# Generate Prisma client.
RUN npx prisma generate
# end of container handling the build

# final output
FROM node:18-alpine3.18 

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/package.json /app/package-lock.json ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/public ./public
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.next ./.next
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/next.config.js ./

USER nextjs

EXPOSE 3000

CMD [ "npm", "start" ]


