FROM node:14-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 5000
RUN yarn global add serve
RUN yarn run build
CMD npx serve -s build/