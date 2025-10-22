// Test API endpoint to debug Google Sheets connection
// Visit: http://localhost:3000/api/test-sheets
//
// This endpoint tests the connection without no-cors mode
// so you can see the actual error messages

import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  success?: boolean
  error?: string
  scriptUrl?: string
  testEmail?: string
  response?: any
  tip?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

  if (!scriptUrl) {
    return res.status(500).json({
      error: 'NEXT_PUBLIC_GOOGLE_SCRIPT_URL not configured',
      tip: 'Check your .env.local file and restart the dev server'
    })
  }

  const testEmail = `test-${Date.now()}@example.com`

  try {
    console.log('Testing Google Script URL:', scriptUrl)
    console.log('Test email:', testEmail)

    const testData = {
      email: testEmail,
      timestamp: new Date().toISOString(),
      userAgent: 'Test API Route'
    }

    console.log('Sending data:', testData)

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
      redirect: 'follow'
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response:', errorText)

      return res.status(response.status).json({
        error: `HTTP ${response.status}: ${response.statusText}`,
        response: errorText,
        scriptUrl: scriptUrl,
        tip: 'Check that your Google Apps Script is deployed correctly'
      })
    }

    const responseData = await response.json()
    console.log('Response data:', responseData)

    return res.status(200).json({
      success: true,
      scriptUrl: scriptUrl,
      testEmail: testEmail,
      response: responseData
    })

  } catch (error: any) {
    console.error('Error testing Google Script:', error)
    return res.status(500).json({
      error: error.message,
      scriptUrl: scriptUrl,
      tip: 'Check browser console for more details'
    })
  }
}
