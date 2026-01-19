FROM 18.12.8
COPY npm install
WORKDIR app
RUN npm install
EXPOSE 1000
CMD ["node","index.js"]