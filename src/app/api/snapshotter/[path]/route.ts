import { NextRequest, NextResponse } from 'next/server';
import { getCurrentEpoch, getEpochByID, getHealthStatusNode, getSnapshotterEpochProcessingStatus, getSnapshotterStatus, getSnapshotterTaskStatus } from './util';

export async function GET(request: NextRequest, { params }: { params: { path: string } }) {
  const endpointPath = params.path;
  console.log(endpointPath, 'endpointPath');

  try {
    if (endpointPath === 'health') return await handleHealthStatusRequest();
    if (endpointPath === 'current_epoch') return await handleCurrentEpochRequest();
    if (endpointPath === 'snapshotter_status') return await handleSnapshotterStatusRequest();
    if (endpointPath === 'snapshotter_epoch_processing_status') return await handleSnapshotterEpochProcessingStatusRequest();
    if (endpointPath === 'epoch') return await handleEpochByIdRequest(request);
    if (endpointPath === 'task_status') return await handleTaskStatusRequest(request);
  } catch (error) {
    // Handle errors
    console.error('Error fetching health status:', error);
    // Return an error response
    return new NextResponse('Error fetching health status', { status: 500 });
  }
}

const handleHealthStatusRequest = async () => {
  // Call getHealthStatusNode function to fetch health status
  const response = await getHealthStatusNode();

  // Return the health status to the user
  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const handleCurrentEpochRequest = async () => {
  // Call getHealthStatusNode function to fetch health status
  const response = await getCurrentEpoch();

  // Return the health status to the user
  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const handleSnapshotterStatusRequest = async () => {
  // Call getHealthStatusNode function to fetch health status
  const response = await getSnapshotterStatus();

  // Return the health status to the user
  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const handleSnapshotterEpochProcessingStatusRequest = async () => {
  // Call getHealthStatusNode function to fetch health status
  const response = await getSnapshotterEpochProcessingStatus();

  // Return the health status to the user
  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const handleEpochByIdRequest = async (request: NextRequest) => {
    const searchParams = new URLSearchParams(request.nextUrl.searchParams);
    const id = searchParams.get('id');
    
    if (!id) {
      return new NextResponse('ID parameter is missing', { status: 400 });
    }

    // Call getEpochByID function to fetch epoch data
    const response = await getEpochByID(id);

    // Return the epoch data to the user
    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
};


const handleTaskStatusRequest = async (request: NextRequest) => {
    const searchParams = new URLSearchParams(request.nextUrl.searchParams);
    const task_type = searchParams.get('task_type');
    const wallet_address = searchParams.get('wallet_address');
    
    if (!task_type) {
      return new NextResponse('task_type parameter is missing', { status: 400 });
    }

    if (!wallet_address) {
      return new NextResponse('wallet_address parameter is missing', { status: 400 });
    }

    // Call getEpochByID function to fetch epoch data
    const response = await getSnapshotterTaskStatus(task_type, wallet_address);

    // Return the epoch data to the user
    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
};