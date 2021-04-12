import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(public repositotyService:RepositoryService) {    
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
      userRole=Role[0];
    }
    if(value.role==="Donor")
       userRole=Role[1];
    if(value.role==="Admin"){
      userRole=Role[2];
    }
    if(value.role==="Restaurant responsible"){
      userRole=Role[3];
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
    console.log(userRole);
     this.repositotyService.create("signup",user).subscribe(data => {
      Swal.fire({
        title: 'Confirm message',
        text: 'successful registration',
        icon: 'success',
        showCancelButton: true,
        width: '500px',
      })
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
