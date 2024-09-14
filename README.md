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

# How to collaborate: Branch and Commit Standards

## Branches
- **When it's a feature:**
  - `feature/<feature-name>`
  - Examples:
    * `feature/crud-product`
    * `feature/crud-client`

- **When it's a bug:**
  - `fix/<bug-name>`
  - Examples:
    * `fix/login-issue`
    * `fix/data-validation`

- **When it's an emergency bug (only towards the `main` branch):**
  - `hotfix/<emergency-name>`
  - Examples:
    * `hotfix/api-crash`
    * `hotfix/security-vulnerability`

## Commits
- **When it's a feature:**
  - `feat: <feature-description>`
  - Example:
    * `feat: allow provided config object to extend other configs`

- **When it's a bug:**
  - `fix: <bug-description>`
  - Example:
    * `fix: prevent racing of requests`
