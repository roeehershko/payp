import {Get, Controller, Res} from '@nestjs/common';

@Controller()
export class AppController {

    @Get()
    root(@Res() res): string {
        return res.render('index', { message: 'Out of space message' });
    }
}
