import { Injectable } from "@angular/core";
import { GLOBAL, ProductoInterface } from "./globales";
import { Subject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class PrincipalServices {

    public url: string; //url de la ruta de la api
    public headers; //cabeceras de peticion

    numero: number = 0; //variable a observar
    private numero$ = new Subject<number>();

    productosCompra: ProductoInterface[] = [];

    /**
     * 
     * @param _http inyeccion de variable de conexion
     */
    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXZpZCIsImlhdCI6MTYyMTQ4MjcwOSwiZXhwIjoxNjIxNTE4NzA5fQ.OSL9bcKOmD1iRzlK79ATT0xzpE0sW3VIzJ_8TWJeOEI" });
    }

    /**
     * aumenta el numero en el carrito de supermercado
     */
    aumentarNumero(numero?) {
        if(numero){
            this.numero=0;
        }else{
            this.numero++;
        }
        this.numero$.next(this.numero);
    }

    /**
     * obtiene el numero del carrito de supermercado como un observador
     * para su subscripcion desde el componente que quiera
     */
    obtenerNumero(): Observable<number> {
        return this.numero$.asObservable();
    }

    /**
     * 
     * @param producto producto a comprar
     * recibe el objeto producto completo desde el principal y lo guarda en el arreglo
     * de productosCompra
     */
    guardarProductosCompra(producto: ProductoInterface) {
        // console.log(producto);
        if (this.productosCompra.length != 0) {
            let prod = this.productosCompra.filter(p => p.id == producto.id)[0];
            if (prod) {
                console.log(prod);
                prod.unidades = producto.unidades;
                prod.numero = producto.numero;
            } else {
                this.aumentarNumero();
                this.productosCompra.push(producto);
            }
            // this.productosCompra.push(producto);
        } else {
            this.aumentarNumero();
            this.productosCompra.push(producto);
        }
    }

    /**
     * devolver los productos a 0
     */
    resetProductosCompra() {
        this.productosCompra = [];
    }

    /**
     * devuelve los productos que se van a comprar
     */
    obtenerProductosCompra() {
        return this.productosCompra;
    }


    /**
     * metodo para consultar productos
     */
    consultarProductos() {
        return this._http.get(`${this.url}/products`, { headers: this.headers });
    }

    /**
     * 
     * @param prodCompras objetos a comprar
     * metodo que envia los objetos en forma de json para actualizar la base de datos
     */
    actualizarProductos(prodCompras: any) {
        let params = JSON.stringify(prodCompras)
        return this._http.put(`${this.url}/products`, params, { headers: this.headers });
    }

}