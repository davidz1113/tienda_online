import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from "./globales";

@Injectable()
export class UsuarioServices {

    public url: string; //url de la ruta de la api
    public headers; //cabeceras de peticion

    /**
     * 
     * @param _http inyeccion de variable de conexion
     */
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    }

    /**
     * 
     * @param correo correo del usuario
     * @param contrasenia contraseña del usuario
     * metodo que consulta al usuario a traves de sus credenciales
     */
    consultarUsuario(correo: string, contrasenia: string) {
        
        return this._http.get(this.url + 'obtenerUsuario.php?opcion=1&correo=' + correo + '&contrasenia=' + contrasenia,{headers:this.headers})
            .pipe(map(res => res.json()));

            
    }

}