import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  console.log("🚀 Starting Lominic API...");

  try {
    console.log("📦 Creating NestJS application...");
    const app = await NestFactory.create(AppModule);
    console.log("✅ NestJS application created successfully");

    // Enable CORS
    console.log("🌐 Configuring CORS...");
    app.enableCors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    });
    console.log("✅ CORS configured");

    // Global validation pipe
    console.log("🔍 Setting up validation pipe...");
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );
    console.log("✅ Validation pipe configured");

    // Global prefix
    console.log("🔗 Setting API prefix...");
    app.setGlobalPrefix("api");
    console.log("✅ API prefix set to /api");

    const port = process.env.PORT || 4000;
    console.log(`🌍 Starting server on port ${port}...`);
    await app.listen(port);

    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`📊 GraphQL Playground: http://localhost:${port}/graphql`);
    console.log(`🔗 API Endpoints: http://localhost:${port}/api`);
  } catch (error) {
    console.error("❌ Failed to start application:", error);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

bootstrap();
