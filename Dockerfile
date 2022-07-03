FROM node:16-alpine AS node

FROM node AS node-with-gyp
RUN apk add g++ make python3

FROM node-with-gyp AS builder
WORKDIR /squid
ADD generateTypes.js .
ADD package.json .
ADD package-lock.json .
ADD indexer/typesBundle.json indexer/
RUN npm ci
ADD tsconfig.json .
ADD src src
RUN npm run build

FROM node-with-gyp AS deps
WORKDIR /squid
ADD generateTypes.js .
ADD package.json .
ADD package-lock.json .
ADD indexer/typesBundle.json indexer/
RUN npm ci --production

FROM node AS squid
WORKDIR /squid
COPY --from=deps /squid/generateTypes.js .
COPY --from=deps /squid/package.json .
COPY --from=deps /squid/package-lock.json .
COPY --from=deps /squid/node_modules node_modules
COPY --from=builder /squid/lib lib
ADD indexer/typesBundle.json indexer/
ADD db db
ADD schema.graphql .
# TODO: use shorter PROMETHEUS_PORT
ENV PROCESSOR_PROMETHEUS_PORT 3000
EXPOSE 3000
EXPOSE 4000


FROM squid AS processor
CMD ["npm", "run", "processor:start"]


FROM squid AS query-node
CMD ["npm", "run", "query-node:start"]