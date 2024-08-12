# KivoraAPI
## Instructions to Run the App
### Clone the Repository
```bash
git clone https://github.com/reduhq/KivoraAPI.git
cd KivoraAPI
```
### Install Dependencies
```bash
npm install
```
### Environment Setup
Create a .env file in the root of the project and configure the required environment variables. You can use the .env.example file as a guide:
```bash
cp .env.example .env
```
### Running the migrations
```bash
npx prisma migrate dev
```
### Running the API
```bash
npm run dev
```