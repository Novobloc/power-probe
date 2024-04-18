import { NextRequest, NextResponse } from 'next/server';
import { getHealthStatusNode } from './util';

export async function GET(request: NextRequest) {
  try {
    // Call getHealthStatusNode function to fetch health status
    const healthStatus = await getHealthStatusNode();

    // Return the health status to the user
    return new NextResponse(JSON.stringify(healthStatus), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Handle errors
    console.error('Error fetching health status:', error);
    // Return an error response
    return new NextResponse('Error fetching health status', { status: 500 });
  }
}
