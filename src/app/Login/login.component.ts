import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsuarioServices } from "../servicios/usuario.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [UsuarioServices]
})
export class LoginComponent implements OnInit {
    //formulario de tipo formGroup (reactiva)
    identificacionForm: FormGroup;
    //para validar que se presiono el boton de iniciarsesion
    enviado = false;
    //progreso de iniciar sesion
    logeandose = false;
    //mensaje de error
    msjerror = '';
    ngOnInit() {
        this.redirijirSiEstaIdentificado();
    }

    constructor(private identForm: FormBuilder, private _userService: UsuarioServices, private _router: Router) {
        this.validarFormulario();
    }

    /**
     * MEtodo que redirije al usuario si este ya se ha registrado
     */
    redirijirSiEstaIdentificado() {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario != null) {
            this._router.navigate(['principal']);
            // console.log("redirijir");
        } else {
            this._router.navigate(['login']);
        }
    }

    //Metodo para validar los campos de los formularios
    validarFormulario(): void {
        this.identificacionForm = this.identForm.group({
            correousuario: ['', [Validators.required, Validators.email]],
            contraseniaUsuario: ['', Validators.required]
        });
    }


    identificarUsuario() {
        this.enviado = true;
        if (this.identificacionForm.invalid) {
            return;
        }
        this.logeandose = true;
        this.msjerror = '';
        const correo = this.identificacionForm.get('correousuario').value;
        const contrasenia = this.identificacionForm.get('contraseniaUsuario').value;
        this._userService.consultarUsuario(correo, contrasenia).subscribe(
            response => {
                if (response) {
                    if (response.estado == 1) {//usuario correcto
                        //logearse redirijiendo a la principal y guardando el usuario para evitar el login
                        localStorage.setItem('usuario', JSON.stringify(response.usuario));
                        this._router.navigate(["/principal"]);
                    } else if (response.estado == 2) {
                        this.msjerror = response.mensaje;
                    }
                }
                this.logeandose = false;
            },
            error => {
                console.log(error);
                this.logeandose = false;
                this.msjerror = 'Ocurrio un error en el servidor, intentelo nuevamente';
            }
        );

    }
}