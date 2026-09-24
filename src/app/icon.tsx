// app/icon.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'black',
        borderRadius: '50%',
        color: 'white',
        fontSize: 280,
        fontWeight: 900,
      }}>
        O
      </div>
    ),
    { ...size }
  )
}