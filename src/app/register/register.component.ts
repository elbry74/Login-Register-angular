import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm!:FormGroup;
  users:any[]= []
  constructor(private fb:FormBuilder ,private service:AuthService  , private _http:HttpClient ,  private router:Router , private toaster:ToastrService) { }
  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.userForm = this.fb.group({
      username:['' , [Validators.required]],
      email:['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required]],

    })
  }

  signUp(){
    this._http.post<any>("http://localhost:3000/user" , this.userForm.value).subscribe(res =>{
      this.toaster.success("Account successfully created" , "" , {
      disableTimeOut: false,
      titleClass: "toastr_title",
      messageClass: "toastr_message",
      timeOut:3000,
      closeButton: true,
      })
      this.userForm.reset();
      this.router.navigate(['/login'])

    } , Err =>{
      alert("email already exists")
    })
  }
}
