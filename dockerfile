FROM node:20-bullseye

WORKDIR /app

# 1) 의존성 파일 복사
COPY package.json package-lock.json ./

# 2) npm install
RUN npm install --legacy-peer-deps

# 3) 나머지 전체 소스 복사
COPY . .

EXPOSE 19006

CMD ["npm", "run", "web"]
