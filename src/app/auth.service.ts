import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap} from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webReqService: WebRequestService, private router: Router) { }

  login(email: string, password: string){
   return this.webReqService.login(email,password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        //the auth tokens will be in the header of this response
        this.setSession(res.body._id,res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("logged in!");
        console.log(res);
      })
    )
  }

  logout(){
    this.removeSession();
  }

  private setSession(userId: string, accessToken: string|any, refreshToken: any|string){
  localStorage.setItem('user-id', userId);
  localStorage.setItem('access-token', accessToken);
  localStorage.setItem('refresh-token', refreshToken);
  }

  private removeSession(){
    localStorage.removeItem('user-id');
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    }

    
}
