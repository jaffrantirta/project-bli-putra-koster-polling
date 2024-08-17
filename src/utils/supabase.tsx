import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./constant";

const projectURL = SUPABASE_URL;
const projectKey = SUPABASE_KEY;

export const supabase = createClient(projectURL, projectKey);
