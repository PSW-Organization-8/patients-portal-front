import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string = "";
  password:string = "";
  token:any;

  constructor(private _loginService:LoginService) { }

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
      this._loginService.sendLoginFormToServer(this.username, this.password).subscribe(f => this.token = f);
      alert(this.token)
      localStorage.setItem('token',JSON.stringify(this.token))
    }
  }
}
