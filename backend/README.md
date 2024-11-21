# Todo Backend

In order to spin this project up, there are a couple of things needed:

1. Supabase Database URL
2. Supabase Database Direct URL
3. Supabase Database Password
4. Supabase JWT Secret

With that information, you can copy the .env.example and rename it to just ".env". To find those keys, please refer to the root of this project

## Routes

- GET `/todos`: Gets all the todos from the current logged in user
- POST `/todos`: Creates a Todo with a name and description. The completed property is automatically set to false.
- PUT `/todos/:todoId/completed`: Marks the specific todo as completed by it's ID
- DELETE `/todos/:todoId`: Deletes a todo by its ID

## Middleware

There is only one custom middleware being used. The `authMiddleware` just parses the header with the `Authorization` key and splits the value into 2. The value of the Authorization header is always "Bearer <token>". Once the token has been retrieved, we compare the JWT from the header against the Supabase JWT token. If its a valid JWT token signed using that secret, we have a valid token and we can get user information from that. That user information gets put into the `req.user` property so it can be used in the next middleware or route logic.

## Auth

There is no authentication being used on the server. Authentication is handled on the Client.  
