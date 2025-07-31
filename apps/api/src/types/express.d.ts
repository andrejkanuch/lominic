import { Session } from 'express-session'

declare module 'express-serve-static-core' {
  interface Request {
    session: Session & {
      garminState?: string
      garminVerifier?: string
      garminUserId?: string
    }
  }
} 