import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap} from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webReqService: WebRequestService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string){
   return this.webReqService.login(email,password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        //the auth tokens will be in the header of this response
        this.setSession(res.body._id,res.headers.get('x-access-token') ?? '', res.headers.get('x-refresh-token') ?? '');
        console.log("logged in!");
        console.log(res);
      })
    )
  }

  signup(email: string, password: string){
    return this.webReqService.signup(email,password).pipe(
       shareReplay(),
       tap((res: HttpResponse<any>) => {
         //the auth tokens will be in the header of this response
         this.setSession(res.body._id,res.headers.get('x-access-token') ?? '', res.headers.get('x-refresh-token') ?? '');
         console.log("sign up");
         console.log(res);
       })
     )
   }

  logout(){
    this.removeSession();
    this.router.navigate(['users/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  private setSession(userId: string, accessToken: string, refreshToken: string){
  localStorage.setItem('user-id', userId);
  
  if (accessToken !== null) {
    localStorage.setItem('x-access-token', accessToken);
  }

  if (refreshToken !== null) {
    localStorage.setItem('x-refresh-token', refreshToken);
  }
}

  private removeSession(){
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
    }

   
  getNewAccessToken(){
    return this.http.get(`${this.webReqService.ROOT_URL}/users/me/access-token`,{
      headers: {
        'x-refresh-token': this.getRefreshToken() ?? '',
        '_id': this.getUserId() ?? ''
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token' ) ?? '');
      })
    )
  }  

    
}
