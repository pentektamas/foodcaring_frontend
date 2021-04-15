import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/enums/role.enum';
import { User } from 'src/app/models/user.model';
import { RepositoryService } from 'src/app/services/repository.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(public repositotyService:RepositoryService,public router:Router) {    
    this.registerForm = new FormGroup({
      firstName: new FormControl('',[Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('',[Validators.required, Validators.minLength(3)]),
      location: new FormControl('',[Validators.required, Validators.minLength(5)]),
      phoneNumber: new FormControl('',[Validators.required, Validators.minLength(10)]),
      username: new FormControl('',[Validators.required, Validators.minLength(5)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      role: new FormControl(''),
  }); }

  get firstName(){
    return this.registerForm.get('firstName')
  }

  get lastName(){
    return this.registerForm.get('lastName')
  }
  get location(){
    return this.registerForm.get('location')
  }

  get phoneNumber(){
    return this.registerForm.get('phoneNumber')
  }

  get username(){
    return this.registerForm.get('username')
  }

  get password(){
    return this.registerForm.get('password')
  }

  ngOnInit(): void {
  }

  public registerUser(value:User){
    let userRole;

    if(value.role==="Disadvantaged person"){
      userRole=Role.DISADVANTAGED_PERSON;
    }
    if(value.role==="Donor")
       userRole=Role.DONOR;
    if(value.role==="Admin"){
      userRole=Role.ADMIN;
    }
    if(value.role==="Restaurant responsible"){
      userRole=Role.RESTAURANT_RESPONSIBLE;
    }
     let user:User ={
      firstName:value.firstName,
      lastName:value.lastName,
      location:value.location,
      phoneNumber:value.phoneNumber,
      role:userRole,
      username:value.username,
      password:value.password
    }
     this.repositotyService.register("signup",user).subscribe(data => {
      Swal.fire({
        title: 'Confirm message',
        text: 'successful registration',
        icon: 'success',
        showCancelButton: true,
        width: '500px',
      })
      this.router.navigate(['/login'])
    },
    (error:any) =>{
      Swal.fire({
        title: 'Alert message',
        text: 'Registration failed',
        icon: 'error',
        showCancelButton: true,
        width: '500px',
      })
    }) 
 
  }
}
