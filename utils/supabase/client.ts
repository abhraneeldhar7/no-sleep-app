import { createClient } from "@supabase/supabase-js";


// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// )




// Create a mock client for development when env vars are not set
const createMockClient = () => {
  return {
    from: () => ({
      insert: async () => ({ data: null, error: null }),
      select: async () => ({ data: [], error: null }),
      update: async () => ({ data: null, error: null }),
      delete: async () => ({ data: null, error: null }),
    }),
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null }, error: null }),
      signUp: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
    },
  };
};

export const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : createMockClient();

