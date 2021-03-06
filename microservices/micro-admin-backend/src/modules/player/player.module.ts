import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './schemas/player.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class PlayerModule {}
