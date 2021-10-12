FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY tsconfig*.json ./

RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

COPY /src ./src
RUN yarn build
ENV NODE_ENV=production

EXPOSE 8080
CMD [ "node", "build/shared/http/server.js" ]
USER node