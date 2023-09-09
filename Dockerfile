FROM node:15
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
          then npm install; \
          else npm install --only=production; \
          fi
COPY . ./
RUN npm run build
ENV PORT 3001
EXPOSE ${PORT}
CMD ["node", "build/src/app.js"]
