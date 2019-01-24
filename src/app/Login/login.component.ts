import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsuarioServices } from "../servicios/usuario.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { redirijirSiEstaIdentificado } from "../servicios/globales";

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
        redirijirSiEstaIdentificado(this._router);
        this.logOut();

    }

    constructor(private identForm: FormBuilder, 
        private _userService: UsuarioServices, private _router: Router,   
         private _route: ActivatedRoute,
        ) {
        this.validarFormulario();
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

    logOut() {
        this._route.params.forEach((params: Params) => {
            let logout = +params['id'];
            if (logout == 1) {
                localStorage.removeItem('usuario');
                //console.log(this.msg);
                this._router.navigate(["/login"]);
                //window.location.href = '/' + GLOBAL.urlBase + '/login';
            }
        });
    }
}