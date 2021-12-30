import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string = "";
  password:string = "";
  token:any;

  constructor(private _loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }


  login(){
    if(this.username == "" || this.password == ""){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill out the text field',
      })
    }
    else{
      this._loginService.sendLoginFormToServer(this.username, this.password).subscribe(f => 
        {this.token = f.token
          localStorage.setItem('token',JSON.stringify(f.token))
          //this.router.navigate(['']);
        });
    }
  }
}
