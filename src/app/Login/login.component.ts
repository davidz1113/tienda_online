import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    //formulario de tipo formGroup (reactiva)
    identificacionForm: FormGroup;
    //para validar que se presiono el boton de iniciarsesion
    enviado = false;
    constructor(private identForm: FormBuilder, ) {
        this.validarFormulario();
    }

    //Metodo para validar los campos de los formularios
    validarFormulario(): void {
        this.identificacionForm = this.identForm.group({
            correousuario: ['', [Validators.required,Validators.email]],
            contraseniaUsuario: ['', Validators.required]
        });
    }


    identificarUsuario(){
        this.enviado = true;
        if(this.identificacionForm.invalid){
            return;
        }
    }
}