# Simple Challenge

Simple Challenge is an app for benchmarking an engineer's coding and communication skills against other engineers that work at similar companies with the same title.

# Getting Started

1. Fork and clone this repo.
2. `npm install`
3. Create `simpleChallenge` database with command `createdb simpleChallenge`
4. Seed the database with command `npm run seed`
5. Start the build process with `npm run start-dev`
6. Navigate to [localhost:8080](http://localhost:8080) to view and use completed app

# Tests

1. Run tests with command `npm test`
2. Once tests have completed re-seed the database with `npm run seed`

# Backend Logic Flow

1. User enters their Candidate Id
2. Route checks cache
   -If in cache send result back to frontend, else proceed to step 3
3. Get candidate in database
4. Find similar candidates based on title and company fractal index
5. Compute percentiles
6. Save to cache
7. send result back to frontend
