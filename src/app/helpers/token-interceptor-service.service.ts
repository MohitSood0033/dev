import { Injectable ,Injector} from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { TokenStorageServiceService } from './token-stroage-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) { }
  intercept(req:any, next:any) {
    let tokenStorage=this.injector.get(TokenStorageServiceService)
    let tokenizedReq = req.clone({
     setHeaders:{
      "x-access-token":`${tokenStorage.getToken()}`
     }
    })
    return next.handle(tokenizedReq)
  }
}