FROM node:15
WORKDIR /app
COPY package.json .
ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; \
#     then yarn install; \
#     else yarn install --production --frozen-lockfile; \
#     fi
RUN npm install
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["npm", "start"]