import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";

export async function getEnumValues(enumName: string) {
    const cookieStore = await cookies();
    const supabase = await createClient()
    const {data, error} = await supabase.rpc("get_enum_values", {enum_type_name: enumName});
    //rpc remote procedure call ^
  
    if (error) {
        console.error("Error fetching enum values:", error);
        return [];
    }

    return data?.map((item: { enum_value: string }) => item.enum_value) ?? [];
}