import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


export function BasicHeaderIntercept (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>  {

    return next(request);

}
