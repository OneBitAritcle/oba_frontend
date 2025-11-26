FROM node:18-bullseye

WORKDIR /app

# 1) package.json만 복사 (yarn.lock 제거)
COPY package.json ./

# 2) npm install
RUN npm install

# 3) 나머지 전체 소스 복사
COPY . .

EXPOSE 19006

CMD ["npm", "start"]
