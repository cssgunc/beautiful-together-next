import { cache } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const fetchPetData = cache(async () => {
    const {data, error} = await supabase
    .from('Available Animals')
    .select('*');

    if (error) throw new Error ('Error fetching pets: ' + error.message);
    return data
});

