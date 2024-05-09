import { NextResponse } from 'next/server';

export async function POST(req: any) {
    const response = NextResponse.json({ message: 'User logged out successfully' }, { status: 200 });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) }); 
    return response;
}
