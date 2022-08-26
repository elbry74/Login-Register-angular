import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  users:any[]= [];
  constructor(private fb:FormBuilder ,private service:AuthService , private _http:HttpClient , private router:Router , private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getUsers()
    this.createForm()
  }

  createForm() {
    this.loginForm = this.fb.group({
      email:['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required]],
    })
  }

  getUsers() {
    this.service.getUsers().subscribe((res:any) => {
      this.users.push = res
      console.log(res)
    })
  }
  submit() {
    const model ={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password,
    }

    let index = this.users.findIndex(item => item.email == this.loginForm.value.email && item.password == this.loginForm.value.password  )
    if(index == -1) {
      this.toaster.error("email not found" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      })
      console.log(index)
    }else {
        this.toaster.success("logged successfully" , "" , {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:5000,
          closeButton: true,
        })
        this.router.navigate(['/home'])
    }
  }
}
