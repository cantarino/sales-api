FROM node:16-alpine

# Create app directory
WORKDIR /home/node/app

# Install bash and add scripts to image
RUN apk add --no-cache bash
ADD .docker/entrypoint.sh ./
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY tsconfig.json ./

RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

COPY /src ./src
RUN yarn build

EXPOSE 8080
CMD [ "/entrypoint.sh" ]