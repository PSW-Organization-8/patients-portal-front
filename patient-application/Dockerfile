FROM node:14 as node

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/patient-application/usr/share/nginx/html
