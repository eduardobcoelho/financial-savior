# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

The root `package.json` is essentially empty (one stray `date-fns` dep). The real app is the NestJS service in `backend/` — **run all commands from `backend/`**. There is no frontend in this repo yet.

## Commands (run from `backend/`)

- Install: `npm install`
- Dev (watch): `npm run start:dev`
- Build / prod: `npm run build` then `npm run start:prod`
- Lint (auto-fix): `npm run lint`
- Format: `npm run format`
- Tests: `npm test`
- Single test by name: `npm test -- -t "<test name>"`
- Single test file: `npx jest <relative/path/file.spec.ts>` (Jest `rootDir` is `src`, so paths passed via `npm test --` should be relative to `src/`)
- E2E: `npm run test:e2e` (uses `test/jest-e2e.json`)
- Coverage: `npm run test:cov`

## Architecture

NestJS 11 monolith with TypeORM + Postgres, JWT auth (`@nestjs/jwt`), bcrypt password hashing, `class-validator`/`class-transformer` for DTOs.

`AppModule` (`backend/src/app.module.ts`) wires the global `ConfigModule`, `DatabaseModule`, and feature modules: `users`, `auth`, `boards`, `categories`, `sheets`.

### Per-feature folder convention

Every feature module follows the same layout — duplicate it when adding a new module:

```
<feature>/
  <feature>.module.ts
  controller/    # thin HTTP layer, applies @UseGuards(AuthJwtTokenGuard) where needed
  dto/           # request/response DTOs (class-validator)
  entity/        # TypeORM entities
  enum/          # validation messages, etc.
  repository/    # data access; one class per aggregate
  service/<action>/<action>.service.ts   # one folder per use case, single exec() method
```

`auth` additionally has `usecase/` (controller → usecase → service) and `guard/`. Other modules currently call services directly from controllers; follow whichever pattern the surrounding module already uses.

### DI by string token — important

Services, repositories, and usecases are **never injected by class**. Each provider file declares an interface (`IFooService`) alongside the class, and the module registers it under the string token of the same name:

```ts
// in <feature>.module.ts
{ provide: 'ICreateBoardService', useClass: CreateBoardService }

// in the consumer
constructor(@Inject('ICreateBoardService') private readonly svc: ICreateBoardService) {}
```

When you add a new service/repository, you must (1) export the interface from the file, (2) register the string token in the module's `providers`, and (3) add it to `exports` if another module needs it (see `users.module.ts` re-exporting `IFindUserByEmailService`, and `auth.module.ts` re-exporting `IFindUserTokenService` + `AuthJwtTokenGuard` for guard consumers). Forgetting any of these produces a runtime "Nest can't resolve dependencies" error rather than a TS error.

### Auth flow

- `AuthJwtTokenGuard` (`backend/src/auth/guard/jwt-token/jwt-token.guard.ts`) is the standard route guard. Protect new controllers with `@UseGuards(AuthJwtTokenGuard)` (see `boards.controller.ts:22`, `sheets.controller.ts:15`). The guard is exported from `AuthModule`, so consuming modules just need `imports: [AuthModule]`.
- Login (`backend/src/auth/service/login/login.service.ts`) invalidates prior `user_tokens` rows, inserts a new one, and embeds its id as `userTokenId` in the JWT. The guard re-checks that row on every request, so revoking a token = setting `revoked = true` in the DB. Refresh tokens are issued separately by `GenerateJwtRefreshTokenService`.
- Required env vars (see `backend/.env.example`): `NEST_JWT_SECRET`, `NEST_JWT_EXPIRES`, `NEST_JWT_REFRESH_EXPIRES`, `NEST_CREATE_USER_PASSWORD`.

### Database

- TypeORM connects in `backend/src/database/database.module.ts`. Connection params are **currently hardcoded** (localhost:5500, user `eduardobcoelho`, db `postgres`) — not read from env. If you change DB config, update this file; don't assume `.env` covers it.
- `synchronize: false` — entity changes do **not** auto-migrate. There is no migrations folder yet; schema must be applied out-of-band.
- Entities load via the glob `__dirname + '/../**/*.entity{.ts,.js}'`, so any `*.entity.ts` under `src/` is picked up automatically.
- Some entities use a non-default Postgres schema, e.g. `@Entity({ name: 'sheets', schema: 'PLANNING' })` in `backend/src/sheets/entity/sheet.entity.ts:11`. The schema must exist in the target database.

## Testing notes

- Unit tests are co-located as `*.spec.ts`; Jest's `rootDir` is `src` and `testRegex` is `.*\.spec\.ts$` (see `backend/package.json`).
- Existing controller specs (e.g. `backend/src/auth/controller/auth.controller.spec.ts`) build a `Test.createTestingModule` and provide string-token mocks (`{ provide: 'ILoginUsecase', useValue: { exec: jest.fn() } }`) — match this pattern when testing anything that uses the DI tokens above.
- E2E tests live under `backend/test/` with their own jest config.

## Style

- ESLint with `typescript-eslint` recommendedTypeChecked + Prettier (`backend/eslint.config.mjs`); `no-explicit-any` is **off**, `no-floating-promises` and `no-unsafe-argument` are **warnings** — don't introduce these gratuitously but they won't fail the lint.
