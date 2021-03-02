import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { toast } from '../toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationUserMessage = {
    email: [
      { type: "required", message: "Veuiller entrez votre addresse email" },
      { type: "pattern", message: "Votre addresse email est incorrecte" }
    ],
    password: [
      { type: "required", message: "Veuiller entrez votre mot de passe" },
      { type: "minlength", message: "Le mot de passe doit contenir au moins 5 caractères ou plus" }

    ]
  }
  validationFormUser: FormGroup;
  constructor(public formbuider: FormBuilder, public router: Router,public authservice: AuthService,) 
  { 

  }

  ngOnInit() {



    this.validationFormUser = this.formbuider.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    })

  }
  LoginUser(value){
    console.log("Am logged in");
    try{
       this.authservice.loginFireauth(value).then( resp =>{
         console.log(resp);
          toast('Vous etez connecter!')
          this.router.navigate(['home']) 
         
       })
    }catch(err){
      toast('Votre email ou mot de passe est incorecte !')
      console.log(err);
    }
  }
  registerPage() {
    return this.router.navigateByUrl('/register');
  }
}
