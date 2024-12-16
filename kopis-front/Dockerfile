FROM node:22
WORKDIR /app
COPY package-docker.json ./package.json
RUN npm install
COPY . .
COPY package-docker.json ./package.json
RUN npm run build
EXPOSE 3001
ENV PORT=3001
ENV WDS_SOCKET_PORT=3001
CMD ["npm", "start"]