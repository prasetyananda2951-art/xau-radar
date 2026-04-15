import { NextResponse } from 'next/server';

// Variabel sementara untuk menyimpan data robot (dalam produksi sebaiknya gunakan database)
let robotData = {
  balance: "0.00",
  equity: "0.00",
  status: "Disconnected",
  lastUpdate: "-"
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Menerima data dari MT5
    robotData = {
      balance: body.balance || "0.00",
      equity: body.equity || "0.00",
      status: "Active",
      lastUpdate: new Date().toLocaleTimeString()
    };

    return NextResponse.json({ message: "Data received by XAU Radar" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to parse data" }, { status: 400 });
  }
}

export async function GET() {
  // Memberikan data ke Dashboard Website
  return NextResponse.json(robotData);
}
