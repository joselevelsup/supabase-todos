# Todo Frontend

In order to get this app up and running with your Supabase instance, you must get the Anon key from YOUR Supabase instance settings. Please refer the root of this project to find those. 

Once you have the Anon key, you can copy the .env.example file and rename it to just ".env"

## Routes

1. `/` - Is just a blank home page
2. `/login` - The Login page
3. `/signup` - The Signup page
4. `/todos` - The Todos page just shows the todos and displays a modal for creating one.

## Auth

Supabase Auth is being used and only the Email and Password Strategy is being used. The way the frontend authenticates with the backend is:
- Supabase client (once the user has provided the correct conditionals) creates a session in localstorage.
- The session contains some user information and some tokens. The token that we care about is the `access_token`.
- The `access_token` is signed by our Supabase instance using the JWT secret we got from it. The `access_token` is also appended to our headers using the `Authorization` header with `Bearer ` in front of said token
- The server then checks to see if that is a valid token that was signed by the Supabase instance using the `jsonwebtoken` module and the secret provided by Supabase

