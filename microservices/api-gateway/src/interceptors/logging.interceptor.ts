import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();

        return next
            .handle()
            .pipe(
                tap(() =>
                    this.logger.log(`request lasted ${Date.now() - now}ms`),
                ),
            );
    }
}
