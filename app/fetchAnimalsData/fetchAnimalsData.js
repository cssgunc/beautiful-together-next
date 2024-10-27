import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


//returns a json
async function fetchAnimalsData() {
    const { data, error } = await supabase
        .from('Available Animals')
        .select('*');  

    if (error) {
        console.error('Error fetching data:', error);
        return null;  
    }

    return data;  
}

export default fetchAnimalsData;


