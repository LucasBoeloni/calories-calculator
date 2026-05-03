import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


export function BasicHeaderIntercept (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>  {

    return next(request);

}
