import axios from 'axios'
import { NextResponse } from 'next/server'

export function handleError(error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  } else {
    return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 500 })
  }
}

export function handleAxiosError(error: unknown, action: string, target: string) {
  if (axios.isAxiosError(error) && process.env.NODE_ENV === 'development') {
    console.error(`Error ${action} ${target}:`, error.response?.data.error)
  } else {
    console.error(`Unexpected error ${action} ${target}:`, error)
  }
}
