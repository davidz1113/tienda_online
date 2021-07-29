import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL } from "./globales";

@Injectable()
export class UsuarioServices {
  public url: string; //url de la ruta de la api
  public headers; //cabeceras de peticion

  /**
   *
   * @param _http inyeccion de variable de conexion
   */
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
  }

  /**
   *
   * @param correo correo del usuario
   * @param contrasenia contraseña del usuario
   * metodo que consulta al usuario a traves de sus credenciales
   */
  consultarUsuario(username: string, contrasenia: string) {
    const userLogin = {
      username,
      password: contrasenia,
    };
    return this._http
      .post(`${this.url}/auth/authenticate`, JSON.stringify(userLogin), {
        headers: this.headers,
      });
      
  }
}
