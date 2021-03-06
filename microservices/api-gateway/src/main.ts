import { NestFactory } from '@nestjs/core';
import { formatInTimeZone } from 'date-fns-tz';
import { AppModule } from './app.module';
import { AllExceptions } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timout.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(
        new LoggingInterceptor(),
        new TimeoutInterceptor(),
    );

    app.useGlobalFilters(new AllExceptions());

    Date.prototype.toJSON = function (): any {
        return formatInTimeZone(
            this,
            'America/Sao_Paulo',
            'yyyy-MM-dd HH:mm:ssXXX',
        );
    };

    app.setGlobalPrefix('api');
    await app.listen(8082);
}
bootstrap();
