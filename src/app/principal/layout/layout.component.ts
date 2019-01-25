import { Component, OnInit } from '@angular/core';
import { redirijirSiEstaIdentificado, ProductoInterface } from '../../servicios/globales';
import { Router } from '@angular/router';
import { PrincipalServices } from '../../servicios/principal.service';
// import * as $ from 'jquery'
declare const $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [PrincipalServices]
})
export class LayoutComponent implements OnInit {

  productos: ProductoInterface[] = [];
  newProductos: ProductoInterface[] = [];
  total: number = 0;
  msjerror = '';
  class = 'alert alert-warning alert-dismissible fade show';
  seleccionado: ProductoInterface = {
    idproducto:0,
    nombre:'',
    precio:0,
    unidades:0,
    urlimagen:''
  };

  constructor(private _router: Router, private _principalService: PrincipalServices) {

  }

  ngOnInit() {
    redirijirSiEstaIdentificado(this._router);
    this.consultarProductos();
  }

  consultarProductos() {
    this._principalService.consultarProductos().subscribe(
      response => {
        if (response.estado == 1) {
          this.productos = response.productos;
          this.newProductos = this.productos.slice();//copia de los productos originales
        } else {
          console.log(response);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 
   * @param event objeto con los productos del carrito
   */
  prodCompras: any;
  mostrarModalCarrito(event) {
    this.prodCompras = event.prodCompra;
    this.total = 0;
    this.comprando = false;
    this.msjerror = '';
    this.prodCompras.map(
      prod => {
        this.total += prod.numero * prod.precio;
      }
    );
    $('#exampleModalLong').modal('show');
  }

  /**
   * 
   * @param filtroProd palabra a buscar en productos
   */
  buscarProducto(filtroProd: string) {
    console.log(filtroProd);
    if (this.productos.length == 0) return;
    this.newProductos = this.productos.filter(producto => producto.nombre.toString().indexOf(filtroProd) != -1);
  }

  /**
   *metodo que envia los id de los productos y las unidades  
   */
  comprando = false;
  estado: number;
  comprarProductos() {
    if (this.prodCompras.length == 0) return;
    this.comprando = true;
    this._principalService.actualizarProductos(this.prodCompras).subscribe(
      response => {
        this.msjerror = response.mensaje;
        if (response.estado == 1) {
          this.estado = 1;
          this.class = 'alert alert-success alert-dismissible fade show';
          this.consultarProductos();
          $('#exampleModalLong').modal('hide')
          this._principalService.resetProductosCompra();
          this._principalService.aumentarNumero(true);
        } else {
          this.estado = 2;
          this.class = 'alert alert-warning alert-dismissible fade show';
        }
        this.comprando = false;
      },
      error => {
        this.estado = 2;
        this.comprando = false;
        this.msjerror = 'Error en el servidor';
        this.class = 'alert alert-warning alert-dismissible fade show';

      }
    );
  }

  /**
   * 
   * @param event objeto para mostrar detalle
   */
  mostrarModalDetalle(event) {
    this.seleccionado = event.prodDetalle;
    $('#modaldetalle').modal('show');
  }

}
