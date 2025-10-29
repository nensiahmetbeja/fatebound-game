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

  // Support both NEXT_PUBLIC_ (browser-accessible) and non-public (server-only) variable names
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

  if (!scriptUrl) {
    // Log for debugging (only in server logs, not sent to client)
    console.error('Google Sheets URL not configured. Check environment variables in Vercel.')
    console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('GOOGLE')))
    
    return res.status(500).json({
      status: 'error',
      message: 'Google Sheets integration not configured. Please contact support.'
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
      const errorText = await response.text()
      console.error('Google Script error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: scriptUrl
      })
      return res.status(500).json({
        status: 'error',
        message: 'Failed to submit email to Google Sheets. Please try again.'
      })
    }

    let result
    try {
      result = await response.json()
    } catch (parseError) {
      const text = await response.text()
      console.error('Failed to parse Google Script response:', text)
      return res.status(500).json({
        status: 'error',
        message: 'Invalid response from email service'
      })
    }

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
    console.error('Error submitting to Google Sheets:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      scriptUrl: scriptUrl ? 'configured' : 'missing'
    })
    return res.status(500).json({
      status: 'error',
      message: 'Unable to process request. Please try again later.'
    })
  }
}
