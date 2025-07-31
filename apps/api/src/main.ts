import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import session from 'express-session'

async function bootstrap() {
  console.log('🚀 Starting Lominic API...')

  try {
    console.log('📦 Creating NestJS application...')
    const app = await NestFactory.create(AppModule)
    console.log('✅ NestJS application created successfully')

    // Enable CORS
    console.log('🌐 Configuring CORS...')
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:4000',
      process.env.FRONTEND_URL,
      process.env.NEXT_PUBLIC_FRONTEND_URL,
    ].filter(Boolean)

    app.enableCors({
      origin: allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
    console.log('✅ CORS configured for origins:', allowedOrigins)

    // Session middleware
    console.log('🔐 Setting up session middleware...')
    app.use(
      session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
      })
    )
    console.log('✅ Session middleware configured')

    // Global validation pipe
    console.log('🔍 Setting up validation pipe...')
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    )
    console.log('✅ Validation pipe configured')

    // Global prefix (but exclude GraphQL)
    console.log('🔗 Setting API prefix...')
    app.setGlobalPrefix('api', {
      exclude: ['/graphql(.*)'],
    })
    console.log('✅ API prefix set to /api (excluding GraphQL)')

    const port = process.env.PORT || 4000
    const isProduction = process.env.NODE_ENV === 'production'
    const baseUrl = isProduction
      ? `https://${
          process.env.RENDER_EXTERNAL_HOSTNAME || 'your-app.onrender.com'
        }`
      : `http://localhost:${port}`

    console.log(`🌍 Starting server on port ${port}...`)
    await app.listen(port)

    console.log(`🚀 Application is running on: ${baseUrl}`)
    console.log(`📊 GraphQL Playground: ${baseUrl}/graphql`)
    console.log(`🔗 API Endpoints: ${baseUrl}/api`)

    if (!isProduction) {
      console.log(`🔧 Development mode - Local URLs shown above`)
    } else {
      console.log(`🚀 Production mode - Deployed on Render`)
    }
  } catch (error) {
    console.error('❌ Failed to start application:', error)
    // console.error("Stack trace:", error.stack);
    process.exit(1)
  }
}

bootstrap()
