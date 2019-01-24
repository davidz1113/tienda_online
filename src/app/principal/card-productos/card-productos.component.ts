import { Component, OnInit, Input } from "@angular/core";

import { PrincipalServices } from "../../servicios/principal.service";
import { ProductoInterface } from "../../servicios/globales";

@Component({
    selector: 'app-card-productos',
    templateUrl: './card-productos.component.html',
    styleUrls: ['./card-productos.component.scss'],
})
export class CardProductosComponent implements OnInit {
    @Input() producto: ProductoInterface;
    bloqueo = false;
    tope: number = 0;
    constructor(private _principalService: PrincipalServices) {
    }

    ngOnInit() {

        this.tope += this.producto.unidades;
        this.producto.unidades -= 1;
    }

    /**
     * 
     * @param numero valor del input
     * metodo que enviar los productos al header
     */
    agregarCarrito(numero) {
        if (numero > 0) {
            this.producto.bloqueo = true;
            this._principalService.aumentarNumero();
            this._principalService.guardarProductosCompra(this.producto);
        }
    }

    /**
     * 
     * @param numero numero del input
     */
    anterior: number = 1;
    cambiarUnidades(numero) {
        if (parseFloat(numero) > this.anterior) {
            this.producto.unidades--;
        } else {
            this.producto.unidades++;
        }
        this.anterior = numero;
    }

}