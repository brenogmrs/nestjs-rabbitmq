import { NestFactory } from '@nestjs/core';
import { formatInTimeZone } from 'date-fns-tz';
import { AppModule } from './app.module';
import { AllExceptions } from './common/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new AllExceptions());

    Date.prototype.toJSON = function (): any {
        return formatInTimeZone(
            this,
            'America/Sao_Paulo',
            'yyyy-MM-dd HH:mm:ssXXX',
        );
    };

    app.setGlobalPrefix('api');
    await app.listen(8081);
}
bootstrap();
