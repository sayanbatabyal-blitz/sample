import { App } from '@/app';
import { TaskRoute } from '@/routes/task.route';
import {InternalRoute} from './routes/internal.routes';

const app = new App([new TaskRoute(),new InternalRoute()]);
app.listen();
