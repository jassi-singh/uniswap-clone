import SanityClient from '@sanity/client'

export const client = SanityClient({
  projectId: '166f29ke',
  dataset: 'production',
  apiVersion: 'v1',
  token:
    'skcJxYmmKWbkMTuZK5HAw4vURvEAubQvWUY2Hy9glnEW5ruZDj4Q0Z5yia95vAIraZ5S3ER7KkyjsBjAL5z8DWRv7ahVCKLSmbTENZB0u56sYQBe8A5vxdSObTbq1wK7npOqvbhMt4HFXh0zTwUIvfvAjo9mVwdMPcQUTeDgVgFHbo2qjNHz',
  useCdn: false,
})
