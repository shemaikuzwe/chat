import { getModels } from "~/lib/server/ai";
import { NextResponse } from "next/server";

export async function GET(){
   try {
    const models=await getModels()
    return NextResponse.json(models)
   } catch (error) {
    console.log(error)
    return NextResponse.json({error:"Internal Server Error"}, {status:500})
   }
}