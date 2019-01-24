import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from "./globales";
import { Subject, Observable } from "rxjs";

@Injectable()
export class PrincipalServices {

    public url: string; //url de la ruta de la api
    public headers; //cabeceras de peticion

    numero: number = 0; //variable a observar
    private numero$ = new Subject<number>();

    /**
     * 
     * @param _http inyeccion de variable de conexion
     */
    constructor(private _http: Http) {
        this.url = GLOBAL.url;
        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    }


    aumentarNumero() {
        this.numero++;
        this.numero$.next(this.numero);
    }

    obtenerNumero(): Observable<number> {
        return this.numero$.asObservable();
    }

    /**
     * metodo para consultar productos
     */
    consultarProductos() {
        return this._http.get(this.url + 'obtenerProductos.php?opcion=1',{headers:this.headers})
            .pipe(map(res => res.json()));
    }

}