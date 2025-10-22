// API route to submit emails to Google Sheets
// This runs server-side, avoiding CORS issues

import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  status: 'success' | 'error'
  message: string
  email?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed'
    })
  }

  const { email, timestamp, userAgent } = req.body

  // Validate email
  if (!email) {
    return res.status(400).json({
      status: 'error',
      message: 'Email is required'
    })
  }

  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

  if (!scriptUrl) {
    return res.status(500).json({
      status: 'error',
      message: 'Google Sheets integration not configured'
    })
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        timestamp: timestamp || new Date().toISOString(),
        userAgent: userAgent || 'Unknown'
      }),
      redirect: 'follow'
    })

    if (!response.ok) {
      console.error('Google Script error:', response.status, response.statusText)
      return res.status(500).json({
        status: 'error',
        message: 'Failed to submit email to Google Sheets'
      })
    }

    const result = await response.json()

    if (result.status === 'success') {
      return res.status(200).json({
        status: 'success',
        message: result.message || 'Email successfully registered',
        email: email
      })
    } else {
      return res.status(400).json({
        status: 'error',
        message: result.message || 'Failed to register email'
      })
    }

  } catch (error: any) {
    console.error('Error submitting to Google Sheets:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}
