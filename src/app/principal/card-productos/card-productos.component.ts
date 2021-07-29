import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { PrincipalServices } from "../../servicios/principal.service";
import { ProductoInterface } from "../../servicios/globales";

@Component({
  selector: "app-card-productos",
  templateUrl: "./card-productos.component.html",
  styleUrls: ["./card-productos.component.scss"],
})
export class CardProductosComponent implements OnInit {
  @Input() producto: ProductoInterface;
  bloqueo = false;
  tope: number = 0;
  unidadesdispo: number;
  @Output() enviarProducto = new EventEmitter();
  constructor(private _principalService: PrincipalServices) {}

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
      
    if (numero > 0 && parseFloat(numero) <= this.tope) {
      this.producto.bloqueo = false;

      this.producto.unidades = this.tope - numero;
      this.producto.numero = numero;
      this._principalService.guardarProductosCompra(this.producto);
    }
  }

  // /**
  //  *
  //  * @param numero numero del input
  //  */
  // anterior: number = 1;
  // cambiarUnidades(numero) {
  //     if (parseFloat(numero) > this.anterior) {
  //         this.producto.unidades--;
  //     } else {
  //         this.producto.unidades++;
  //     }
  //     this.anterior = numero;
  // }
}
