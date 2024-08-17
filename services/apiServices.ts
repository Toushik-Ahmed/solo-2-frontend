import axios from 'axios';
import { getToken } from './tokenServices';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;

export interface ProposeSlots {
  timezone: string;
  startTime: string[];
}

export const proposeSlot = async (data: ProposeSlots) => {
  try {
    const response = await axios.post(
      `${baseUrl}/interviewdashboard/dashboard/createSession`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
